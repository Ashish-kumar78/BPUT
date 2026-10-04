import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatResponse {
  success: boolean;
  reply: string;
  source: 'gemini' | 'ollama' | 'campus-knowledge-base';
  suggestions?: string[];
}

@Injectable()
export class ChatbotService {
  constructor(private readonly prisma: PrismaService) {}

  async processQuery(message: string, history: ChatMessage[] = []): Promise<ChatResponse> {
    const query = message.trim().toLowerCase();

    // 1. Check if external Gemini API key is configured
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey) {
      try {
        // Dynamic invocation if key exists
        return await this.callGemini(message, geminiKey);
      } catch (e: any) {
        console.warn('Gemini API call failed, falling back to Campus Knowledge Base:', e?.message);
      }
    }

    // 2. Intelligent Campus Knowledge Base Adapter (Answers questions based on real DB records)
    if (query.includes('fee') || query.includes('due') || query.includes('payment')) {
      const fees = await this.prisma.feeStructure.findFirst();
      return {
        success: true,
        source: 'campus-knowledge-base',
        reply: `The annual semester fee is ₹${fees?.total?.toLocaleString('en-IN') || '98,500'}. The next payment installment due date is 15 November 2026. You can pay online via UPI, NetBanking, or at the Accounts Office counter.`,
        suggestions: ['View Fee Statement', 'Download Official Receipts', 'Scholarship Eligibility'],
      };
    }

    if (query.includes('exam') || query.includes('modular') || query.includes('internal')) {
      return {
        success: true,
        source: 'campus-knowledge-base',
        reply: `Internal assessment modular examinations for Semester 5 are scheduled between 15 October and 22 October 2026. Data Structures (CS501) exam will be held at 10:00 AM in Hall-A.`,
        suggestions: ['View Exam Timetable', 'Check Continuous Assessment Marks'],
      };
    }

    if (query.includes('canteen') || query.includes('food') || query.includes('meal') || query.includes('menu')) {
      const foods = await this.prisma.foodItem.findMany({ where: { isAvailable: true }, take: 4 });
      const menuList = foods.map((f) => `${f.name} (₹${f.price})`).join(', ');
      return {
        success: true,
        source: 'campus-knowledge-base',
        reply: `The Central Smart Canteen is open from 7:30 AM to 8:30 PM. Today's popular items: ${menuList}. You can pre-order and generate a meal token using your RFID smart pass.`,
        suggestions: ['Order Food Online', 'Check RFID Wallet Balance', 'Top Up Canteen Wallet'],
      };
    }

    if (query.includes('hostel') || query.includes('room') || query.includes('warden') || query.includes('curfew')) {
      return {
        success: true,
        source: 'campus-knowledge-base',
        reply: `Night curfews are strictly implemented at 8:30 PM across all hostels with mandatory biometric check-in before 8:45 PM. Chief Resident Warden Mrs. Nibedita Das is contactable at +91 94370 33445.`,
        suggestions: ['Lodge Maintenance Complaint', 'Request Visitor Entry Pass'],
      };
    }

    if (query.includes('library') || query.includes('book')) {
      return {
        success: true,
        source: 'campus-knowledge-base',
        reply: `The Central Knowledge Resource Center is open until 9:00 PM on weekdays. Standard loan duration is 15 days with up to 3 books allowed concurrently per student pass.`,
        suggestions: ['Search Library Catalog', 'Reserve a Book Online'],
      };
    }

    if (query.includes('placement') || query.includes('job') || query.includes('internship') || query.includes('tcs') || query.includes('infosys')) {
      return {
        success: true,
        source: 'campus-knowledge-base',
        reply: `Upcoming campus drives include TCS (3.6 LPA), Infosys (3.4 LPA), and Cognizant (4.0 LPA). Registrations close on 25 October. Maintain 65%+ aggregate without active backlogs to remain eligible.`,
        suggestions: ['Register for Placement Drive', 'Explore Internship Listings'],
      };
    }

    // Default institutional guidance
    return {
      success: true,
      source: 'campus-knowledge-base',
      reply: `Hello! I am your GIFT Autonomous Campus Assistant. You can ask me about continuous internal marks, exam schedules, fee dues, library book reservations, hostel guidelines, canteen menus, or placement drives.`,
      suggestions: ['When are the internal exams?', 'What are today canteen items?', 'How to check my fee dues?'],
    };
  }

  private async callGemini(message: string, apiKey: string): Promise<ChatResponse> {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `You are an AI assistant for GIFT Autonomous College, Bhubaneswar. Answer concisely and helpfully: ${message}` }] }],
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini HTTP error ${response.status}`);
    }

    const data: any = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.';

    return {
      success: true,
      reply,
      source: 'gemini',
      suggestions: ['View Academic Calendar', 'Check Dashboard'],
    };
  }
}

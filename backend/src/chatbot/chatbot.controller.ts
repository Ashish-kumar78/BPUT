import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ChatbotService } from './chatbot.service';

@ApiTags('AI Campus Assistant')
@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('query')
  @ApiOperation({ summary: 'Send question to AI Campus Assistant' })
  @ApiResponse({ status: 200, description: 'AI response with guidance and suggestions' })
  async query(@Body() body: { message: string; history?: any[] }) {
    const res = await this.chatbotService.processQuery(body.message, body.history);
    return res;
  }
}

import MarksManagementModule from '../marks/MarksManagementModule'

export default function MarksPage({ initialRole = 'teacher' }) {
  return <MarksManagementModule initialRole={initialRole} />
}

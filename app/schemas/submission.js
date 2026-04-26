export default {
  name: 'submission',
  title: 'Submission',
  type: 'document',
  fields: [
    { name: 'studentName', type: 'string', title: 'Student Name' },
    { name: 'studentId', type: 'string', title: 'Roll Number' },
    { name: 'assignmentTitle', type: 'string', title: 'Assignment Title' },
    {
      name: 'attachment',
      title: 'Attachment (PDF/Image)',
      type: 'file',
      options: {
        accept: '.pdf,.png,.jpg,.jpeg' // Restrict file types here
      }
    },
    { name: 'status', type: 'string', title: 'Status', initialValue: 'Pending' }
  ]
}
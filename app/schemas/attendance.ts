// schemas/attendance.ts
export default {
  name: 'attendance',
  type: 'document',
  title: 'Attendance Record',
  fields: [
    { name: 'studentName', type: 'string', title: 'Student Name' },
    { name: 'date', type: 'date', title: 'Date' },
    { name: 'status', type: 'string', title: 'Status', options: { list: ['Present', 'Absent'] } }
  ]
}
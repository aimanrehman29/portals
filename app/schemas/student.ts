export default {
  name: 'student',
  type: 'document',
  title: 'Registered Students',
  fields: [
    { name: 'name', type: 'string', title: 'Full Name' },
    { name: 'email', type: 'string', title: 'Email Address' },
    { name: 'rollNumber', type: 'string', title: 'Roll Number' },
    { name: 'role', type: 'string', title: 'Role', initialValue: 'student' }
  ]
}
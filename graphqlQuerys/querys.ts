export const ADD_EMPLEADO = `
mutation Mutation($empleadoInput: EmpleadoInputFields!) {
  addEmpleado(empleadoInput: $empleadoInput) {
    message
    successful
  }
}`
export const ADD_EMPLEADO = `
mutation AddEmpleado($empleadoInput: EmpleadoInputFields!) {
  addEmpleado(empleadoInput: $empleadoInput) {
    message
    successful
  }
}`
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADD_EMPLEADO = void 0;
exports.ADD_EMPLEADO = `
mutation Mutation($empleadoInput: EmpleadoInputFields!) {
  addEmpleado(empleadoInput: $empleadoInput) {
    message
    successful
  }
}`;

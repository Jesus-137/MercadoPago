import { CreateUseCase } from '../../src/Gestion_users/src/Clientes/application/CreateUseCase'; 
import { Repository } from '../../src/Gestion_users/src/Clientes/domain/Repository'; 
import { Clientes } from '../../src/Gestion_users/src/Clientes/domain/Clientes';

// Mock de uuid para asegurar que siempre devuelve el mismo valor en las pruebas
jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('mocked-uuid'),
}));

describe('CreateUseCase', () => {
  let movimientoRepo: jest.Mocked<Repository>;
  let createUseCase: CreateUseCase;

  beforeEach(() => {
    movimientoRepo = {
      create: jest.fn(),
      getByuuid: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
    };

    createUseCase = new CreateUseCase(movimientoRepo);
  });

  it('debería crear un cliente exitosamente y devolver el cliente', async () => {
    // Datos de prueba
    const nombre = 'Juan';
    const password = 'password123';
    const tipo = 'admin';
    const telefono = '123456789';
    const clienteMock: Clientes = {
      uuid: 'mocked-uuid',
      nombre,
      password,
      tipo,
      telefono
    };

    // Configuramos el mock para que la función create devuelva un cliente simulado
    movimientoRepo.create.mockResolvedValue(clienteMock);

    // Llamamos al caso de uso
    const result = await createUseCase.run(nombre, password, tipo, telefono);

    // Verificamos que la función create del repositorio fue llamada con los argumentos correctos
    expect(movimientoRepo.create).toHaveBeenCalledWith(
      'mocked-uuid',
      nombre,
      password,
      tipo,
      telefono
    );

    // Verificamos que el resultado devuelto sea el cliente simulado
    expect(result).toEqual(clienteMock);
  });

  it('debería devolver null si ocurre un error', async () => {
    // Configuramos el mock para que la función create lance un error
    movimientoRepo.create.mockRejectedValue(new Error('Error en el repositorio'));

    // Llamamos al caso de uso
    const result = await createUseCase.run('Juan', 'password123', 'admin', '123456789');

    // Verificamos que el resultado sea null
    expect(result).toBeNull();
  });
});

const BooksService = require('./books.service');
const { generateManyBook } = require('../fake/book.fake');

//  Es una funcion fantasma que manejaremos.
const mockGetAll = jest.fn();

// jest.mock('../lib/mongo.lib' Suplanta a la llamada de la libreria de mongo,
// para que cuando sea llamada en su lugar ejecute otro jest.fn()
// y mediante mockImplementation sea seteado el objeto con el metodo getAll: mockGetAll

jest.mock('../lib/mongo.lib', () => jest.fn().mockImplementation(() => ({
  getAll: mockGetAll,
  create: () => {},
})));

describe('Test for BooksServices', () => {
  let service;
  beforeEach(() => {
    service = new BooksService();
    // para limpiar todos los mocks
    jest.clearAllMocks();
  });

  describe('test for getBooks', () => {
    test('should return a list book', async () => {
      // Arrange
      // Seteamos que cuando mockGetAll sea llamado retorne fakeBooks
      const fakeBooks = generateManyBook(20);
      mockGetAll.mockResolvedValue(fakeBooks);
      // Act
      const books = await service.getBooks({});
      console.log(books);
      // Assert
      expect(books.length).toEqual(fakeBooks.length);
      expect(mockGetAll).toHaveBeenCalled();
      expect(mockGetAll).toHaveBeenCalledWith('books', {});
    });
    test('should return a name book', async () => {
      // Arrange
      // Seteamos que cuando mockGetAll sea llamado retorne fakeBooks
      const fakeBooks = generateManyBook(5);
      mockGetAll.mockResolvedValue(fakeBooks);
      // Act
      const books = await service.getBooks({});
      console.log(books);
      // Assert
      expect(books[0].name).toEqual(fakeBooks[0].name);
    });
  });
});

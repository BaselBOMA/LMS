using LMS.LibraryItems;

namespace LMS.Books;

public class BookDto : LibraryItemDto
{
    public string Author { get; set; }
    public int Pages { get; set; }
}

using AutoMapper;
using LMS.Books;
using LMS.Dvds;
using LMS.LibraryItems;
using LMS.Magazines;

namespace LMS;

public class LMSApplicationAutoMapperProfile : Profile
{
    public LMSApplicationAutoMapperProfile()
    {
        /* You can configure your AutoMapper mapping configuration here.
         * Alternatively, you can split your mapping configurations
         * into multiple profile classes for a better organization. */
        CreateMap<LibraryItem, LibraryItemDto>();
        CreateMap<CreateUpdateLibraryItemDto, LibraryItem>();
        CreateMap<Book, BookDto>();
        CreateMap<CreateUpdateBookDto, Book>();
        CreateMap<Magazine, MagazineDto>();
        CreateMap<CreateUpdateMagazineDto, Magazine>();
        CreateMap<Dvd, DvdDto>();
        CreateMap<CreateUpdateDvdDto, Dvd>();
    }
}

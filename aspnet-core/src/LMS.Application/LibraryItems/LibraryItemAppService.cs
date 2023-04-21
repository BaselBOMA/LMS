using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace LMS.LibraryItems;

public class LibraryItemAppService :
    CrudAppService<
        LibraryItem, //The Library Item entity
        LibraryItemDto, //Used to show Library items
        Guid, //Primary key of the LibraryItem entity
        PagedAndSortedResultRequestDto, //Used for paging/sorting
        CreateUpdateLibraryItemDto>, //Used to create/update a LibraryItem
    ILibraryItemAppService //implement the ILibraryItemAppService
{
    public LibraryItemAppService(IRepository<LibraryItem, Guid> repository)
        : base(repository)
    {

    }
}

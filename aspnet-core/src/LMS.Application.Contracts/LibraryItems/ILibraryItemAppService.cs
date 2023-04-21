using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace LMS.LibraryItems;

public interface ILibraryItemAppService :
    ICrudAppService< //Defines CRUD methods
        LibraryItemDto, //Used to show library items
        Guid, //Primary key of the library item entity
        PagedAndSortedResultRequestDto, //Used for paging/sorting
        CreateUpdateLibraryItemDto> //Used to create/update a library item
{

}

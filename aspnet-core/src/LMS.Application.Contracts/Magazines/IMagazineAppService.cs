using LMS.LibraryItems;
using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace LMS.Magazines;

public interface IMagazineAppService :
    ICrudAppService< //Defines CRUD methods
        MagazineDto, //Used to show magazines
        Guid, //Primary key of the magazine entity
        PagedAndSortedResultRequestDto, //Used for paging/sorting
        CreateUpdateMagazineDto> //Used to create/update a magazine
{

}

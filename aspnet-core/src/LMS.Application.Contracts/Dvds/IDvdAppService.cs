using LMS.LibraryItems;
using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace LMS.Dvds;

public interface IDvdAppService :
    ICrudAppService< //Defines CRUD methods
        DvdDto, //Used to show Dvds
        Guid, //Primary key of the Dvd entity
        PagedAndSortedResultRequestDto, //Used for paging/sorting
        CreateUpdateDvdDto> //Used to create/update a Dvd

{

}
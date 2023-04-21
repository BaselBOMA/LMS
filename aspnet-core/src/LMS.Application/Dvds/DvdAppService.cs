using LMS.LibraryItems;
using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace LMS.Dvds;

public class DvdAppService :
    CrudAppService<
        Dvd, //The Dvd entity
        DvdDto, //Used to show Dvd
        Guid, //Primary key of the Dvd entity
        PagedAndSortedResultRequestDto, //Used for paging/sorting
        CreateUpdateDvdDto>, //Used to create/update a Dvd
    IDvdAppService //implement the IDvdAppService
{
    public DvdAppService(IRepository<Dvd, Guid> repository)
        : base(repository)
    {

    }
}

using LMS.LibraryItems;
using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace LMS.Magazines;

public class MagazineAppService :
    CrudAppService<
        Magazine, //The Magazine entity
        MagazineDto, //Used to show Magazines
        Guid, //Primary key of the Magzine entity
        PagedAndSortedResultRequestDto, //Used for paging/sorting
        CreateUpdateMagazineDto>, //Used to create/update a Magazine
    IMagazineAppService //implement the IMagazineAppService
{
    public MagazineAppService(IRepository<Magazine, Guid> repository)
        : base(repository)
    {

    }
}

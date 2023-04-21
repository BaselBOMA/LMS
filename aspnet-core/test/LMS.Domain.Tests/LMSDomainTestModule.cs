using LMS.EntityFrameworkCore;
using Volo.Abp.Modularity;

namespace LMS;

[DependsOn(
    typeof(LMSEntityFrameworkCoreTestModule)
    )]
public class LMSDomainTestModule : AbpModule
{

}

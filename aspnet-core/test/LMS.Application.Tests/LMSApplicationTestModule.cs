using Volo.Abp.Modularity;

namespace LMS;

[DependsOn(
    typeof(LMSApplicationModule),
    typeof(LMSDomainTestModule)
    )]
public class LMSApplicationTestModule : AbpModule
{

}

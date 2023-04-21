using LMS.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.Modularity;

namespace LMS.DbMigrator;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(LMSEntityFrameworkCoreModule),
    typeof(LMSApplicationContractsModule)
    )]
public class LMSDbMigratorModule : AbpModule
{

}

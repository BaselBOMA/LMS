using Volo.Abp.Ui.Branding;
using Volo.Abp.DependencyInjection;

namespace LMS;

[Dependency(ReplaceServices = true)]
public class LMSBrandingProvider : DefaultBrandingProvider
{
    public override string AppName => "LMS";
}

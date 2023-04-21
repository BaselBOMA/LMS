using Volo.Abp.Settings;

namespace LMS.Settings;

public class LMSSettingDefinitionProvider : SettingDefinitionProvider
{
    public override void Define(ISettingDefinitionContext context)
    {
        //Define your own settings here. Example:
        //context.Add(new SettingDefinition(LMSSettings.MySetting1));
    }
}

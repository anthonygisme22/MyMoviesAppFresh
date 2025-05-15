namespace MyMoviesApp.Core.Entities
{
    public class FeatureFlag
    {
        public int FeatureFlagId { get; set; }
        public string Name { get; set; } = null!;
        public bool IsEnabled { get; set; }
    }
}

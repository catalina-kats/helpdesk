namespace HelpdeskApp.Query
{
    public class Query
    {
        private const int MaxPageSize = 100;
        private int _pageSize = 20;

        public int Page { get; set; } = 1;

        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = value > MaxPageSize ? MaxPageSize : value < 1 ? 1 : value;
        }

        // Filters
        public string? Search { get; set; }
        public int? Status { get; set; }
        public int? Priority { get; set; }
        public DateTime? CreatedFrom { get; set; }
        public DateTime? CreatedTo { get; set; }

        // Sorting
        public string? SortBy { get; set; }
        public bool Desc { get; set; }
    }
}

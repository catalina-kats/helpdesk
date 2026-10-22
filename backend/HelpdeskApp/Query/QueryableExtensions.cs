using Microsoft.EntityFrameworkCore;

namespace HelpdeskApp.Query
{
    public static class QueryableExtensions
    {
        public static async Task<PagedResult<T>> ToPagedResultAsync<T>(
            this IQueryable<T> query, int page, int pageSize, CancellationToken ct = default)
        {
            page = Math.Max(1, page);
            var total = await query.CountAsync(ct);
            var items = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync(ct);

            return new PagedResult<T> { Items = items, Page = page, PageSize = pageSize, TotalCount = total };
        }
    }
}

using System.Threading.Tasks;

namespace MyMoviesApp.Core.Interfaces
{
    /// <summary>
    /// Abstraction over the OpenAI Chat API.
    /// </summary>
    public interface IOpenAiService
    {
        /// <param name="prompt">The full prompt to send to ChatGPT.</param>
        /// <returns>Raw assistant content as plain text.</returns>
        Task<string> GetChatCompletionAsync(string prompt);
    }
}

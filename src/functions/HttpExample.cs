using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Linq;
using System.Collections.Generic;
using System.Linq;

namespace functions
{
    public static class HttpExample
    {
        [FunctionName("HttpExample")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            [CosmosDB(
                databaseName: "smilhas-cosmos-db",
                collectionName: "smilhas-cosmos-container",
                ConnectionStringSetting = "CosmosDbConnectionString")] IAsyncCollector<dynamic> documentsOut,
                [CosmosDB(
                databaseName: "smilhas-cosmos-db",
                collectionName: "smilhas-cosmos-container",
                ConnectionStringSetting = "CosmosDbConnectionString")] DocumentClient client,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            string name = req.Query["name"];

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);
            name = name ?? data?.name;

            if (!string.IsNullOrEmpty(name))
            {
                // Add a JSON document to the output container.
                await documentsOut.AddAsync(new
                {
                    // create a random ID
                    id = System.Guid.NewGuid().ToString(),
                    name = name
                });
            }
            else
            {
                // var docLink = "dbs/smilhas-cosmos-db/colls/smilhas-cosmos-container/docs/3b719cf9-1e2d-4a75-bd5e-99b30e1c0754";
                // var docLink = "dbs/aK4xAA==/colls/aK4xANnchNs=/docs/aK4xANnchNsBAAAAAAAAAA==/";
                // Document doc = await client.ReadDocumentAsync(docLink);
                // name = doc.ToString();
                
                // FUNCA ----------------
                // var docUri = UriFactory.CreateDocumentUri("smilhas-cosmos-db", "smilhas-cosmos-container", "3b719cf9-1e2d-4a75-bd5e-99b30e1c0754");
                // Document document = await client.ReadDocumentAsync(
                //     docUri,
                //     new RequestOptions { PartitionKey = new PartitionKey("3b719cf9-1e2d-4a75-bd5e-99b30e1c0754") } );
                // name = document.ToString();

                Uri collectionUri = UriFactory.CreateDocumentCollectionUri("smilhas-cosmos-db", "smilhas-cosmos-container");

                IDocumentQuery<MessageItem> query = client.CreateDocumentQuery<MessageItem>(collectionUri).AsDocumentQuery();

                var result = await query.ExecuteNextAsync<MessageItem>();
                var debug = result.ToList();
                name = result.ToList().FirstOrDefault().Name;
            }

            string responseMessage = string.IsNullOrEmpty(name)
                ? "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response."
                : $"Hello, {name}. This HTTP triggered function executed successfully.";

            return new OkObjectResult(responseMessage);
        }
    }

    public class MessageItem
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("partitionKey")]
        public string PartitionKey { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }
    }
}

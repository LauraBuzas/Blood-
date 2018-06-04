using System;
using System.Collections.Generic;
using System.Text;
using System.Net.Http;
using Newtonsoft.Json;
using System.Threading.Tasks;
using BloodPlus.ModelViews.AccountViewModels;

namespace UnitTestsProject.APIUtils
{
    class AccountUtils
    {
        private static readonly String LoginURL = "http://localhost:49853/account/login";

        public static async Task<Dictionary<HttpClient, HttpResponseMessage>> LoginUser(String email, String password)
        {
            LoginViewModel donor = CreateUser(email, password);
            HttpClient client = HttpUtils.CreateHttpClient();
            HttpContent data = new StringContent(JsonConvert.SerializeObject(donor), Encoding.UTF8, "application/json");
            HttpResponseMessage response = await client.PostAsync(LoginURL, data);
            return new Dictionary<HttpClient, HttpResponseMessage>
            {
                { client, response }
            };
        }

        public static async Task<HttpClient> LoginUserAndGetClient(String email, String password)
        {
            var dictonary = (await LoginUser(email, password)).GetEnumerator();
            dictonary.MoveNext();
            return dictonary.Current.Key;
        }

        public static async Task<HttpResponseMessage> LoginUserAndGetResponsMessage(String email, String password) {
            var dictonary = (await LoginUser(email, password)).GetEnumerator();
            dictonary.MoveNext();
            return dictonary.Current.Value;
        }

        public static LoginViewModel CreateUser(String email, String password)
        {
            LoginViewModel user = new LoginViewModel
            {
                Email = email,
                Password = password
            };
            return user;
        }
    }
}

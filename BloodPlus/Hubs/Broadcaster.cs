using BloodPlus.ModelViews;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace BloodPlus.Hubs
{
    public class Broadcaster : Hub<IBroadcaster>
    {
        public Broadcaster()
        {
        }
        public override Task OnConnectedAsync()
        {
            // Set connection id for just connected client only
            return Clients.Client(Context.ConnectionId).SetConnectionId(Context.ConnectionId);
            
        }


        //Server side methods called from client
        public Task Subscribe(string clientType)
        {
            
            return Groups.AddAsync(Context.ConnectionId, clientType);
        }

        public Task Unsubscribe(string clientType)
        {
            return Groups.RemoveAsync(Context.ConnectionId, clientType);
        }

        public Task SendRequest(DoctorRequestViewModel request)
        {
            return Clients.Group("DonationCenterDoctor").SendRequest(request);
        }


    }

    // Client side methods to be invoked by Broadcaster Hub
    public interface IBroadcaster
    {
        Task SetConnectionId(string connectionId);
        Task SendRequest(DoctorRequestViewModel request);
    }
    
}

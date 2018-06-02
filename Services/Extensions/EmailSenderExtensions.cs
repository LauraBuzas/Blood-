using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using BloodPlus.Services;
using DatabaseAccess.Models;

namespace BloodPlus.Services
{
    public static class EmailSenderExtensions
    {
        public static Task SendEmailConfirmationAsync(this IEmailSender emailSender, string email, Donor donor, Address centerAddress)
        {
            return emailSender.SendEmailAsync(email, "Avem nevoie de tine", CreateMessage(donor,centerAddress));//{HtmlEncoder.Default.Encode(link)}
        }

        private static string CreateMessage(Donor donor, Address centerAddress)
        {
            var body = $@"<div style='background-color:#8FC4D6;height:100%;width:70%;margin:auto'>{Environment.NewLine}
                            <img width=100% src='http://www.neomobile-jobs.com/wp-content/uploads/2014/07/blood-donation.jpg' alt=''>{Environment.NewLine}
                            <p>Buna ziua, {donor.FirstName} {donor.LastName}! <br/> {Environment.NewLine}
                                Este nevoie de sange la centrul de pe strada {centerAddress.Street}, numarul {centerAddress.Number}.<br/> <br/>{Environment.NewLine}
                                Va asteptam!{Environment.NewLine}
                            </p>{Environment.NewLine}
                            </div>{Environment.NewLine}";

            return body;
        }
    }
}

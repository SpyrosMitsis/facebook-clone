using backend.Models;
using Bogus;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BogusData.FakeModels
{

    internal class FakeUser
    {
        Faker<User> userFake;


        public FakeUser() {

            Randomizer.Seed = new Random(420);

            userFake = new Faker<User>()
                .RuleFor(u => u.Id, f => (f.IndexFaker) + 1)
                .RuleFor(u => u.FirstName, f => f.Name.FirstName())
                .RuleFor(u => u.Surname, f => f.Name.LastName())
                .RuleFor(u => u.Email, f => f.Internet.Email())
                .RuleFor(u => u.Password, f => f.Internet.Password())
                .RuleFor(u => u.DateOfBirth, f => f.Date.Past().Date)
                .RuleFor(u => u.DayOfJoyning, f => f.Date.Past().Date)
                .RuleFor(u => u.Gender, f => f.PickRandom("Male", "Female", "Prefer not to say"))
                ;
        }



    }
}

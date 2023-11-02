using System.IdentityModel.Tokens.Jwt;

namespace backend.Helpers
{
    public interface IJwtService
    {
        public string Generate(int id, DateTime expirationTime);
        public JwtSecurityToken Verify(string jwt);
    }
}

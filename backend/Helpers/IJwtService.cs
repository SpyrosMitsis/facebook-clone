using System.IdentityModel.Tokens.Jwt;

namespace backend.Helpers
{
    public interface IJwtService
    {
        public string Generate(int id);
        public JwtSecurityToken Verify(string jwt);
    }
}

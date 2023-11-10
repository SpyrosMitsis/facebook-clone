import { useAuthHeader, useSignIn } from "react-auth-kit";

const useUpdateReactAuthKitUserState = () => {
    const signIn = useSignIn();
    const authHeader = useAuthHeader();

    const [tokenType, token] = authHeader().split(" ");
    console.log(token)
    console.log(tokenType)

    if (!tokenType || !token) {
        return () => {};
    }

    return (user: any) => {
        signIn({
            token,
            tokenType,
            expiresIn: 3600,
            authState: user,
        });
    };
};

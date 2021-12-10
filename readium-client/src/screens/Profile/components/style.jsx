import styled from "styled-components";

export const CoverImage = styled.div`
  position: relative;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  background-image: url(${(props) => props.src});
  background-color: ${({ theme }) => theme.colors.lightGrey};
  height: 33vh;
  max-height: 640px;
  min-height: 176px;
`;

export const Avatar = styled.img`
  position: absolute;
  bottom: -68px;
  width: 136px;
  height: 136px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  border-radius: 50%;
  border: 2px solid white;
  background-color: ${({ theme }) => theme.colors.lightGrey};
`;

export const ContentLayout = styled.div`
  position: relative;
  padding-bottom: 100px;
`;

export const Displayname = styled.h1`
  margin-top: 83px;
  margin-bottom: 0px;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  padding: 0;
`;

export const Job = styled.h3`
  text-align: center;
  font-size: 20px;
  font-weight: normal;
  padding: 0;
  margin-top: 10px;
`;

export const FollowButton = styled.button`
  width: 74px;
  height: 32px;
  font-size: 16px;
  font-family: "Lato", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
  cursor: pointer;
  background-color: white;
  border-radius: 16px;
  border: solid black 1px;
  padding-bottom: 2px;
  transition: all 0.15s;

  &:hover {
    border: solid ${({ theme }) => theme.colors.accent} 1px;
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export const UnfollowButton = styled(FollowButton)`
  border: solid ${({ theme }) => theme.colors.accent} 1px;
  background-color: ${({ theme }) => theme.colors.accent};
  color: white;
  width: 85px;

  &:hover {
    background-color: white;
    border: solid ${({ theme }) => theme.colors.accent} 1px;
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export const OptionButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 90%;
  color: black;
  transition: all 0.15s;
  text-align: center;
  cursor: pointer;
  background-color: white;
  border: solid black 1px;
  padding-bottom: 0;
  padding-top: 4px;

  &:hover {
    border: solid ${({ theme }) => theme.colors.accent} 1px;
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export const VerticalDivider = styled.div`
  border-left: 1px solid ${({ theme }) => theme.colors.lightGrey};
  height: 32px;
  position: absolute;
  left: 50%;
`;

export const FollowText = styled.span`
  font-family: "Raleway", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 16px;
`;

export const Biography = styled.p`
  width: 30vw;
  text-align: center;
  font-family: "PT Sans", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 18px;

  @media only screen and (max-width: 1000px) {
    width: 70vw;
  }
`;

export const InformationIcon = styled.a`
  color: black;
  text-decoration: none;
`;

export const UpperBorderButton = styled.button`
  border-top: solid ${({ theme }) => theme.colors.middleGrey} 2px;
  border-left: none;
  border-right: none;
  border-bottom: none;
  background-color: white;
  color: black;
  font-size: 20px;
  width: 86px;
  height: 40px;
  cursor: pointer;
  transition: border-top 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);

  &.focus {
    border-top: solid black 2px;
  }
`;

export const EditProfileButton = styled.button`
  position: absolute;
  width: 127px;
  height: 40px;
  background-color: white;
  border: solid black 1px;
  border-radius: 30px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  top: calc(33vh + 20px);
  right: 50px;
  transition: all 0.2s;

  @media only screen and (max-width: 600px) {
    width: 80px;
    height: 30px;
    font-size: 12px;
    right: 30px;
  }

  @media only screen and (max-width: 400px) {
    width: 60px;
    height: 30px;
    font-size: 9px;
    right: 30px;
  }

  @media only screen and (max-width: 300px) {
    width: 50px;
    height: 30px;
    font-size: 9px;
    right: 15px;
  }

  &:hover {
    background-color: black;
    color: white;
  }
`;

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  Header,
  Input,
  InputLabel,
  Note,
  OutlinedButton,
  TextArea,
} from "./styles";
import {
  useFetchProfile,
  useUpdateProfile,
} from "../../../common/api/settingQuery";
import useInput from "../../../common/hooks/useInput";

export default function ProfileSettings({ profileId }) {
  const { data: profile } = useFetchProfile(profileId);
  const updateProfile = useUpdateProfile(profileId);
  const [displayName, setDisplayName, initDisplayName] = useInput();
  const [job, setJob, initJob] = useInput();
  const [biography, setBiography, initBiography] = useInput();
  const [facebook, setFacebook, initFacebook] = useInput();
  const [contactEmail, setContactEmail, initContactEmail] = useInput();
  const [twitter, setTwitter, initTwitter] = useInput();
  const [instagram, setInstagram, initInstagram] = useInput();

  useEffect(() => {
    if (profile) {
      initDisplayName(profile.displayName);
      initJob(profile.job);
      initBiography(profile.biography);
      initFacebook(profile.facebook);
      initContactEmail(profile.contactEmail);
      initTwitter(profile.twitter);
      initInstagram(profile.instagram);
    }
  }, [profile]);

  const handleSubmit = () => {
    updateProfile.mutate({
      displayName,
      biography,
      job,
      facebook,
      twitter,
      instagram,
      contactEmail,
    });
  };
  return (
    <>
      <Header>Profile settings</Header>
      <InputLabel>Display name</InputLabel>
      <Input width="350px" value={displayName} onChange={setDisplayName} />
      <Note>This name appears wherever you shows up</Note>

      <InputLabel className="mt-3">Job</InputLabel>
      <Input width="350px" value={job} onChange={setJob} />
      <Note>Your job will be displayed inside your profile page.</Note>

      <InputLabel className="mt-3">Biography</InputLabel>
      <TextArea value={biography} onChange={setBiography} />
      <Note>Your biography will be displayed inside your profile page.</Note>

      <Header>Contact information</Header>

      <InputLabel className="mt-3">Facebook</InputLabel>
      <Input width="350px" value={facebook} onChange={setFacebook} />

      <InputLabel className="mt-3">Email</InputLabel>
      <Input width="350px" value={contactEmail} onChange={setContactEmail} />

      <InputLabel className="mt-3">Twitter</InputLabel>
      <Input width="350px" value={twitter} onChange={setTwitter} />

      <InputLabel className="mt-3">Instagram</InputLabel>
      <Input width="350px" value={instagram} onChange={setInstagram} />

      <OutlinedButton className="mt-4" onClick={handleSubmit}>
        Update
      </OutlinedButton>
    </>
  );
}

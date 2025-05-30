const ProfileInfo = async (Demande, Reponse) => {
  const { username, role } = Demande;
  Reponse.status(200).json({ name: username, Role: role });
};

export default ProfileInfo;

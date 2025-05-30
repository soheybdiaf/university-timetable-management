-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 24 mai 2025 à 01:01
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `cs_timetable`
--

-- --------------------------------------------------------

--
-- Structure de la table `administrateur`
--

CREATE TABLE `administrateur` (
  `id_administrateur` int(11) NOT NULL,
  `nom` varchar(20) NOT NULL,
  `prenom` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `username` varchar(20) NOT NULL,
  `mot_passe` char(32) NOT NULL,
  `role` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `administrateur`
--

INSERT INTO `administrateur` (`id_administrateur`, `nom`, `prenom`, `email`, `username`, `mot_passe`, `role`) VALUES
(1, 'diaf', 'soheyb', 'admin@gmail.com', 'soheyb_diaf', '4392e5891129ac80d6957f7336dc0e67', 'administrateur');

-- --------------------------------------------------------

--
-- Structure de la table `enseignant`
--

CREATE TABLE `enseignant` (
  `id_enseignant` int(11) NOT NULL,
  `nom_complet` varchar(35) DEFAULT NULL,
  `username` varchar(20) NOT NULL,
  `mot_passe` char(32) NOT NULL,
  `matricule` varchar(15) NOT NULL,
  `email` varchar(30) NOT NULL,
  `module_preferes` varchar(30) NOT NULL,
  `jours_preferes` set('Samedi','Dimanche','Lundi','Mardi','Mercredi','Jeudi') NOT NULL,
  `horaires_preferes` set('08:00-09:30','09:45-11:15','11:30-13:00','14:00-15:30','15:45-17:15') NOT NULL,
  `departement` varchar(30) NOT NULL,
  `role` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `enseignant`
--

INSERT INTO `enseignant` (`id_enseignant`, `nom_complet`, `username`, `mot_passe`, `matricule`, `email`, `module_preferes`, `jours_preferes`, `horaires_preferes`, `departement`, `role`) VALUES
(34, 'enseignant 1', 'ens_1', '0550e63322d3171f2cbbd388356a4e83', 'MZK003', 'enseignant3@gmail.com', 'Algorithmique 1', 'Samedi,Dimanche,Lundi', '08:00-09:30,09:45-11:15,11:30-13:00', 'Computer', 'Teacher'),
(35, 'enseignant 3', 'ens_3', '0550e63322d3171f2cbbd388356a4e83', 'MZK004', 'enseignant4@gmail.com', '', 'Samedi,Dimanche,Lundi', '11:30-13:00', 'Computer Science', 'Teacher'),
(36, 'enseignant 5', 'ens_5', '0550e63322d3171f2cbbd388356a4e83', 'MZK005', 'enseignant5@gmail.com', '', '', '08:00-09:30,09:45-11:15,11:30-13:00', 'Computer Science', 'Teacher'),
(37, 'enseignant 6', 'ens_6', '0550e63322d3171f2cbbd388356a4e83', 'MZK006', 'enseignant6@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(38, 'enseignant 7', 'ens_7', '0550e63322d3171f2cbbd388356a4e83', 'MZK007', 'enseignant7@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(39, 'enseignant 8', 'ens_8', '0550e63322d3171f2cbbd388356a4e83', 'MZK008', 'enseignant8@gmail.com', 'génie logiciel', 'Samedi', '09:45-11:15', 'Computer Science', 'Teacher'),
(40, 'enseignant 9', 'ens_9', '0550e63322d3171f2cbbd388356a4e83', 'MZK009', 'enseignant9@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(41, 'enseignant 10', 'ens_10', '0550e63322d3171f2cbbd388356a4e83', 'MZK010', 'enseignant10@gmail.com', 'Algèbre 1', 'Samedi,Lundi', '08:00-09:30', 'Computer Science', 'Teacher'),
(42, 'enseignant 11', 'ens_11', '0550e63322d3171f2cbbd388356a4e83', 'MZK011', 'enseignant11@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(43, 'enseignant 12', 'ens_12', '0550e63322d3171f2cbbd388356a4e83', 'MZK012', 'enseignant12@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(44, 'enseignant 13', 'ens_13', '0550e63322d3171f2cbbd388356a4e83', 'MZK013', 'enseignant13@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(45, 'enseignant 14', 'ens_14', '0550e63322d3171f2cbbd388356a4e83', 'MZK014', 'enseignant14@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(46, 'enseignant 15', 'ens_15', '0550e63322d3171f2cbbd388356a4e83', 'MZK015', 'enseignant15@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(47, 'enseignant 16', 'ens_16', '0550e63322d3171f2cbbd388356a4e83', 'MZK016', 'enseignant16@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(48, 'enseignant 17', 'ens_17', '0550e63322d3171f2cbbd388356a4e83', 'MZK017', 'enseignant17@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(49, 'enseignant 18', 'ens_18', '0550e63322d3171f2cbbd388356a4e83', 'MZK018', 'enseignant18@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(50, 'enseignant 19', 'ens_19', '0550e63322d3171f2cbbd388356a4e83', 'MZK019', 'enseignant19@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(51, 'enseignant 20', 'ens_20', '0550e63322d3171f2cbbd388356a4e83', 'MZK020', 'enseignant20@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(52, 'enseignant 21', 'ens_21', '0550e63322d3171f2cbbd388356a4e83', 'MZK021', 'enseignant21@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(53, 'enseignant 22', 'ens_22', '0550e63322d3171f2cbbd388356a4e83', 'MZK022', 'enseignant22@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(54, 'enseignant 23', 'ens_23', '0550e63322d3171f2cbbd388356a4e83', 'MZK023', 'enseignant23@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(55, 'enseignant 24', 'ens_24', '0550e63322d3171f2cbbd388356a4e83', 'MZK024', 'enseignant24@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(56, 'enseignant 25', 'ens_25', '10af96c47d6bcc91e803c590f1e59761', 'MZK025', 'enseignant25@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(57, 'enseignant 26', 'ens_26', '0550e63322d3171f2cbbd388356a4e83', 'MZK026', 'enseignant26@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(58, 'enseignant 27', 'ens_27', '0550e63322d3171f2cbbd388356a4e83', 'MZK027', 'enseignant27@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(59, 'enseignant 28', 'ens_28', '0550e63322d3171f2cbbd388356a4e83', 'MZK028', 'enseignant28@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(60, 'enseignant 29', 'ens_29', '0550e63322d3171f2cbbd388356a4e83', 'MZK029', 'enseignant29@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(61, 'enseignant 30', 'ens_30', '0550e63322d3171f2cbbd388356a4e83', 'MZK030', 'enseignant30@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(62, 'enseignant 31', 'ens_31', '0550e63322d3171f2cbbd388356a4e83', 'MZK031', 'enseignant31@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(63, 'enseignant 32', 'ens_32', '0550e63322d3171f2cbbd388356a4e83', 'MZK032', 'enseignant32@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(64, 'enseignant 33', 'ens_33', '0550e63322d3171f2cbbd388356a4e83', 'MZK033', 'enseignant33@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(65, 'enseignant 34', 'ens_34', '0550e63322d3171f2cbbd388356a4e83', 'MZK034', 'enseignant34@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(66, 'enseignant 35', 'ens_35', '0550e63322d3171f2cbbd388356a4e83', 'MZK035', 'enseignant35@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(67, 'enseignant 36', 'ens_36', '0550e63322d3171f2cbbd388356a4e83', 'MZK036', 'enseignant36@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(68, 'enseignant 37', 'ens_37', '0550e63322d3171f2cbbd388356a4e83', 'MZK037', 'enseignant37@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(69, 'enseignant 38', 'ens_38', '0550e63322d3171f2cbbd388356a4e83', 'MZK038', 'enseignant38@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(70, 'enseignant 39', 'ens_39', '0550e63322d3171f2cbbd388356a4e83', 'MZK039', 'enseignant39@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(71, 'enseignant 40', 'ens_40', '0550e63322d3171f2cbbd388356a4e83', 'MZK040', 'enseignant40@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(72, 'enseignant 41', 'ens_41', '0550e63322d3171f2cbbd388356a4e83', 'MZK041', 'enseignant41@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(73, 'enseignant 42', 'ens_42', '0550e63322d3171f2cbbd388356a4e83', 'MZK042', 'enseignant42@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(74, 'enseignant 43', 'ens_43', '0550e63322d3171f2cbbd388356a4e83', 'MZK043', 'enseignant43@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(75, 'enseignant 44', 'ens_44', '0550e63322d3171f2cbbd388356a4e83', 'MZK044', 'enseignant44@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(76, 'enseignant 45', 'ens_45', '0550e63322d3171f2cbbd388356a4e83', 'MZK045', 'enseignant45@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(77, 'enseignant 46', 'ens_46', '0550e63322d3171f2cbbd388356a4e83', 'MZK046', 'enseignant46@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(78, 'enseignant 47', 'ens_47', '0550e63322d3171f2cbbd388356a4e83', 'MZK047', 'enseignant47@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(79, 'enseignant 48', 'ens_48', '0550e63322d3171f2cbbd388356a4e83', 'MZK048', 'enseignant48@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(80, 'enseignant 49', 'ens_49', '0550e63322d3171f2cbbd388356a4e83', 'MZK049', 'enseignant49@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(82, 'enseignant 50', 'ens_50', '0550e63322d3171f2cbbd388356a4e83', 'MZK050', 'enseignant50@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(87, 'enseignant 51', 'ens_51', '0550e63322d3171f2cbbd388356a4e83', 'MZK051', 'enseignant51@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(88, 'enseignant 52', 'ens_52', '0550e63322d3171f2cbbd388356a4e83', 'MZK052', 'enseignant52@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(89, 'enseignant 53', 'ens_53', '0550e63322d3171f2cbbd388356a4e83', 'MZK053', 'enseignant53@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(90, 'enseignant 54', 'ens_54', '0550e63322d3171f2cbbd388356a4e83', 'MZK054', 'enseignant54@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(91, 'enseignant 55', 'ens_55', '0550e63322d3171f2cbbd388356a4e83', 'MZK055', 'enseignant55@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(92, 'enseignant 56', 'ens_56', '0550e63322d3171f2cbbd388356a4e83', 'MZK056', 'enseignant56@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(93, 'enseignant 57', 'ens_57', '0550e63322d3171f2cbbd388356a4e83', 'MZK057', 'enseignant57@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(94, 'enseignant 58', 'ens_58', '0550e63322d3171f2cbbd388356a4e83', 'MZK058', 'enseignant58@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(95, 'enseignant 59', 'ens_59', '0550e63322d3171f2cbbd388356a4e83', 'MZK059', 'enseignant59@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(96, 'enseignant 60', 'ens_60', '0550e63322d3171f2cbbd388356a4e83', 'MZK060', 'enseignant60@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(97, 'enseignant 61', 'ens_61', '0550e63322d3171f2cbbd388356a4e83', 'MZK061', 'enseignant61@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(98, 'enseignant 62', 'ens_62', '0550e63322d3171f2cbbd388356a4e83', 'MZK062', 'enseignant62@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(99, 'enseignant 63', 'ens_63', '0550e63322d3171f2cbbd388356a4e83', 'MZK063', 'enseignant63@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(100, 'enseignant 64', 'ens_64', '0550e63322d3171f2cbbd388356a4e83', 'MZK064', 'enseignant64@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(101, 'enseignant 65', 'ens_65', '0550e63322d3171f2cbbd388356a4e83', 'MZK065', 'enseignant65@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(102, 'enseignant 66', 'ens_66', '0550e63322d3171f2cbbd388356a4e83', 'MZK066', 'enseignant66@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(103, 'enseignant 67', 'ens_67', '0550e63322d3171f2cbbd388356a4e83', 'MZK067', 'enseignant67@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(104, 'enseignant 68', 'ens_68', '0550e63322d3171f2cbbd388356a4e83', 'MZK068', 'enseignant68@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(105, 'enseignant 69', 'ens_69', '0550e63322d3171f2cbbd388356a4e83', 'MZK069', 'enseignant69@gmail.com', '', '', '', 'Computer Science', 'Teacher'),
(112, 'Difi abderehmen', 'Difi_abderehmen', 'd2dbaf387aeaf22583986c48532e5bb7', '122255', 'Difiabderehmen@gmail.com', '', '', '', 'Computer Science', 'enseignant');

-- --------------------------------------------------------

--
-- Structure de la table `etudiant`
--

CREATE TABLE `etudiant` (
  `id_etudiant` int(11) NOT NULL,
  `nom_complet` varchar(35) NOT NULL,
  `username` varchar(20) NOT NULL,
  `mot_passe` char(32) NOT NULL,
  `matricule` varchar(15) NOT NULL,
  `email` varchar(30) NOT NULL,
  `group_id` int(11) DEFAULT NULL,
  `role` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `etudiant`
--

INSERT INTO `etudiant` (`id_etudiant`, `nom_complet`, `username`, `mot_passe`, `matricule`, `email`, `group_id`, `role`) VALUES
(450, 'student 1', 'student_1', '4392e5891129ac80d6957f7336dc0e67', '20252025', 'student1@gmail.com', 7, 'Student'),
(451, 'student 2', 'student_2', '4392e5891129ac80d6957f7336dc0e67', '2018476525', 'student2@gmail.com', 12, 'Student');

-- --------------------------------------------------------

--
-- Structure de la table `groupe`
--

CREATE TABLE `groupe` (
  `id_groupe` int(11) NOT NULL,
  `nom_groupe` varchar(10) NOT NULL,
  `niveau_groupe` int(11) DEFAULT NULL,
  `specialite_groupe` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `groupe`
--

INSERT INTO `groupe` (`id_groupe`, `nom_groupe`, `niveau_groupe`, `specialite_groupe`) VALUES
(1, 'G01L1', 1, 1),
(2, 'G02L1', 1, 1),
(3, 'G03L1', 1, 1),
(4, 'G04L1', 1, 1),
(5, 'G05L1', 1, 1),
(6, 'G06L1', 1, 1),
(7, 'G07L1', 1, 1),
(8, 'G08L1', 1, 1),
(9, 'G09L1', 1, 1),
(10, 'G10L1', 1, 1),
(11, 'G01L2', 2, 1),
(12, 'G02L2', 2, 1),
(13, 'G03L2', 2, 1),
(14, 'G04L2', 2, 1),
(15, 'G05L2', 2, 1),
(16, 'G06L2', 2, 1),
(17, 'G07L2', 2, 1),
(18, 'G08L2', 2, 1),
(19, 'G09L2', 2, 1),
(20, 'G10L2', 2, 1),
(21, 'G01L3', 3, 1),
(22, 'G02L3', 3, 1),
(23, 'G03L3', 3, 1),
(24, 'G04L3', 3, 1),
(25, 'G05L3', 3, 1),
(26, 'G06L3', 3, 1),
(27, 'G07L3', 3, 1),
(28, 'G08L3', 3, 1),
(29, 'G09L3', 3, 1),
(30, 'G10L3', 3, 1),
(31, 'M1G01GADM', 4, 2),
(32, 'M1G01IATI', 4, 3),
(33, 'M1G01ILC', 4, 4),
(34, 'M1G01RSI', 4, 5),
(35, 'M1G01SEM', 4, 6),
(36, 'M1G01SID', 4, 7),
(37, 'M2G01GADM', 5, 2),
(38, 'M2G01IATI', 5, 3),
(39, 'M2G01ILC', 5, 4),
(40, 'M2G01RSI', 5, 5),
(41, 'M2G01SEM', 5, 6),
(42, 'M2G01SID', 5, 7);

-- --------------------------------------------------------

--
-- Structure de la table `horaires`
--

CREATE TABLE `horaires` (
  `id_horaires` int(11) NOT NULL,
  `heure_debut` time NOT NULL,
  `heure_fin` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `horaires`
--

INSERT INTO `horaires` (`id_horaires`, `heure_debut`, `heure_fin`) VALUES
(1, '08:00:00', '09:30:00'),
(2, '09:45:00', '11:15:00'),
(3, '11:30:00', '13:00:00'),
(4, '14:00:00', '15:30:00'),
(5, '15:45:00', '17:15:00');

-- --------------------------------------------------------

--
-- Structure de la table `jours`
--

CREATE TABLE `jours` (
  `id_jours` int(11) NOT NULL,
  `nom_jour` enum('Lundi','Mardi','Mercredi','Jeudi','Samedi','Dimanche') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `jours`
--

INSERT INTO `jours` (`id_jours`, `nom_jour`) VALUES
(1, 'Samedi'),
(2, 'Dimanche'),
(3, 'Lundi'),
(4, 'Mardi'),
(5, 'Mercredi'),
(6, 'Jeudi');

-- --------------------------------------------------------

--
-- Structure de la table `module`
--

CREATE TABLE `module` (
  `id_module` int(11) NOT NULL,
  `nom_module` varchar(60) NOT NULL,
  `semester_module` tinyint(2) NOT NULL,
  `niveau_module` int(11) DEFAULT NULL,
  `specialite_module` int(11) DEFAULT NULL,
  `nombre_td` tinyint(1) NOT NULL,
  `nombre_tp` tinyint(1) NOT NULL,
  `nombre_cours` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `module`
--

INSERT INTO `module` (`id_module`, `nom_module`, `semester_module`, `niveau_module`, `specialite_module`, `nombre_td`, `nombre_tp`, `nombre_cours`) VALUES
(67, 'algorithmique 2', 2, 1, 1, 1, 1, 1),
(68, 'structure de machine 2', 2, 1, 1, 1, 0, 1),
(69, 'probabilités et statistique', 2, 1, 1, 1, 0, 1),
(70, 'technologie de l\'information et de la communication', 2, 1, 1, 0, 0, 1),
(71, 'Matlab', 2, 1, 1, 0, 1, 1),
(72, 'electricité générale', 2, 1, 1, 1, 0, 1),
(73, 'architecture', 1, 2, 1, 1, 1, 1),
(74, 'anglais 2', 1, 2, 1, 0, 0, 1),
(75, 'algorithmique 3', 1, 2, 1, 1, 1, 2),
(76, 'systèmes d\'information', 1, 2, 1, 1, 1, 1),
(78, 'méthodes numériques', 1, 2, 1, 0, 1, 1),
(79, 'logique mathématique', 1, 2, 1, 1, 0, 1),
(84, 'théorie des graphes', 1, 2, 1, 1, 0, 1),
(87, 'théorie des langages', 2, 2, 1, 1, 1, 1),
(88, 'systèmes d\'exploitation 1', 2, 2, 1, 1, 1, 1),
(89, 'bases de données', 2, 2, 1, 1, 1, 1),
(90, 'réseaux', 2, 2, 1, 1, 1, 1),
(91, 'programmation orientée objet', 2, 2, 1, 0, 1, 1),
(92, 'développement web', 2, 2, 1, 0, 1, 1),
(93, 'anglais 3', 2, 2, 1, 0, 0, 1),
(94, 'compilation', 1, 3, 1, 1, 1, 1),
(95, 'systèmes d\'exploitation 2', 1, 3, 1, 1, 1, 1),
(96, 'génie logiciel', 1, 3, 1, 1, 1, 1),
(97, 'interface homme machine', 1, 3, 1, 1, 1, 1),
(98, 'programmation linénaire', 1, 3, 1, 1, 0, 1),
(99, 'probabilité et statistiques', 1, 3, 1, 1, 0, 1),
(100, 'economie numérique', 1, 3, 1, 0, 0, 1),
(101, 'applications mobiles', 2, 3, 1, 0, 1, 1),
(102, 'sécurité informatique', 2, 3, 1, 1, 0, 1),
(103, 'intelligence artificielle', 2, 3, 1, 0, 1, 1),
(104, 'données semi-structurées', 2, 3, 1, 0, 1, 1),
(105, 'rédaction scientifique _ l3', 2, 3, 1, 1, 0, 0),
(115, 'création de startup _ l3', 2, 3, 1, 0, 0, 1),
(117, 'analyse 1', 1, 1, 1, 2, 0, 2),
(135, 'Algèbre 1', 1, 1, 1, 1, 0, 1),
(136, 'Algorithmique 1', 1, 1, 1, 1, 2, 2),
(137, 'Structure de machine 1', 1, 1, 1, 1, 0, 1),
(138, 'Electronique et composants des systèmes', 1, 1, 1, 1, 0, 1),
(139, 'Anglais 1', 1, 1, 1, 0, 0, 1),
(140, 'Terminologie scientifique et expression écrite', 1, 1, 1, 0, 0, 1),
(141, 'Analyse 2', 2, 1, 1, 1, 0, 2),
(142, 'Algèbre 2', 2, 1, 1, 1, 0, 1);

-- --------------------------------------------------------

--
-- Structure de la table `module_enseignant`
--

CREATE TABLE `module_enseignant` (
  `enseignant_id` int(11) NOT NULL,
  `module_id` int(11) NOT NULL,
  `type_module` enum('supervised_work','pratical_work','courses') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `module_enseignant`
--

INSERT INTO `module_enseignant` (`enseignant_id`, `module_id`, `type_module`) VALUES
(34, 67, 'courses'),
(34, 136, 'supervised_work'),
(34, 136, 'pratical_work'),
(34, 136, 'courses'),
(35, 68, 'courses'),
(35, 137, 'supervised_work'),
(35, 137, 'courses'),
(36, 117, 'courses'),
(36, 141, 'courses'),
(37, 135, 'courses'),
(37, 142, 'courses'),
(38, 69, 'courses'),
(38, 138, 'courses'),
(39, 71, 'courses'),
(39, 139, 'courses'),
(40, 72, 'courses'),
(40, 140, 'courses'),
(41, 67, 'supervised_work'),
(41, 67, 'pratical_work'),
(42, 67, 'supervised_work'),
(42, 67, 'pratical_work'),
(43, 67, 'supervised_work'),
(43, 67, 'pratical_work'),
(44, 67, 'supervised_work'),
(44, 67, 'pratical_work'),
(45, 67, 'supervised_work'),
(45, 67, 'pratical_work'),
(46, 141, 'supervised_work'),
(47, 141, 'supervised_work'),
(48, 141, 'supervised_work'),
(49, 93, 'courses'),
(50, 90, 'courses'),
(51, 68, 'supervised_work'),
(52, 68, 'supervised_work'),
(53, 68, 'supervised_work'),
(54, 142, 'supervised_work'),
(55, 142, 'supervised_work'),
(56, 142, 'supervised_work'),
(57, 69, 'supervised_work'),
(58, 69, 'supervised_work'),
(59, 69, 'supervised_work'),
(60, 71, 'pratical_work'),
(61, 71, 'pratical_work'),
(62, 71, 'pratical_work'),
(63, 72, 'supervised_work'),
(64, 72, 'supervised_work'),
(65, 72, 'supervised_work'),
(66, 70, 'courses'),
(67, 87, 'courses'),
(68, 89, 'courses'),
(69, 88, 'courses'),
(70, 91, 'courses'),
(71, 92, 'courses'),
(72, 87, 'supervised_work'),
(72, 87, 'pratical_work'),
(73, 87, 'supervised_work'),
(73, 87, 'pratical_work'),
(74, 88, 'supervised_work'),
(74, 88, 'pratical_work'),
(75, 88, 'supervised_work'),
(75, 88, 'pratical_work'),
(76, 88, 'supervised_work'),
(76, 88, 'pratical_work'),
(78, 92, 'pratical_work'),
(79, 92, 'pratical_work'),
(80, 90, 'supervised_work'),
(80, 90, 'pratical_work'),
(82, 90, 'supervised_work'),
(82, 90, 'pratical_work'),
(87, 89, 'supervised_work'),
(87, 89, 'pratical_work'),
(88, 89, 'supervised_work'),
(88, 89, 'pratical_work'),
(89, 91, 'pratical_work'),
(90, 91, 'pratical_work'),
(91, 104, 'courses'),
(92, 101, 'courses'),
(93, 102, 'courses'),
(94, 103, 'courses'),
(95, 115, 'courses'),
(96, 105, 'supervised_work'),
(97, 105, 'supervised_work'),
(98, 104, 'pratical_work'),
(99, 104, 'pratical_work'),
(100, 102, 'supervised_work'),
(101, 102, 'supervised_work'),
(102, 103, 'pratical_work'),
(103, 103, 'pratical_work'),
(104, 101, 'pratical_work'),
(105, 101, 'pratical_work');

-- --------------------------------------------------------

--
-- Structure de la table `niveau`
--

CREATE TABLE `niveau` (
  `id_niveau` int(11) NOT NULL,
  `nom_niveau` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `niveau`
--

INSERT INTO `niveau` (`id_niveau`, `nom_niveau`) VALUES
(1, 'LICENCE 1'),
(2, 'LICENCE 2'),
(3, 'LICENCE 3'),
(4, 'MASTER 1'),
(5, 'MASTER 2');

-- --------------------------------------------------------

--
-- Structure de la table `salle`
--

CREATE TABLE `salle` (
  `id_salle` int(11) NOT NULL,
  `nom_salle` varchar(8) NOT NULL,
  `bloc_salle` varchar(15) NOT NULL,
  `type_salle` enum('salle_tp','salle_td','amphi') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `salle`
--

INSERT INTO `salle` (`id_salle`, `nom_salle`, `bloc_salle`, `type_salle`) VALUES
(82, 'AG58', 'Block_AG', 'salle_td'),
(83, 'AG59', 'Block_AG', 'salle_td'),
(84, 'AG41', 'Block_AG', 'salle_td'),
(85, 'AG42', 'Block_AG', 'salle_td'),
(86, 'AG30', 'Block_AG', 'salle_td'),
(87, 'AG32', 'Block_AG', 'salle_td'),
(88, 'AG43', 'Block_AG', 'salle_td'),
(89, 'AG31', 'Block_AG', 'salle_td'),
(90, 'AG30Bis', 'Block_AG', 'salle_td'),
(91, 'S1', 'DEPARETEMENT', 'salle_tp'),
(92, 'S2', 'DEPARETEMENT', 'salle_tp'),
(93, 'S3', 'DEPARETEMENT', 'salle_tp'),
(94, 'S4', 'DEPARETEMENT', 'salle_tp'),
(95, 'S5', 'DEPARETEMENT', 'salle_tp'),
(96, 'S6', 'DEPARETEMENT', 'salle_tp'),
(97, 'Mi5', 'MIAS', 'salle_td'),
(98, 'Mi8', 'MIAS', 'salle_td'),
(99, 'J9', 'Block_J', 'salle_td'),
(100, 'J10', 'Block_J', 'salle_td'),
(101, 'J12', 'Block_J', 'salle_td'),
(103, 'J16', 'Block_J', 'salle_td'),
(108, 'amphi 15', 'amphi', 'amphi'),
(109, 'amphi 12', 'amphi', 'amphi');

-- --------------------------------------------------------

--
-- Structure de la table `seance`
--

CREATE TABLE `seance` (
  `id_seance` int(11) NOT NULL,
  `semester_seance` tinyint(2) NOT NULL,
  `type_seance` enum('supervised_work','pratical_work','courses') NOT NULL,
  `niveau_id` int(11) NOT NULL,
  `groupe_id` int(11) DEFAULT NULL,
  `module_id` int(11) NOT NULL,
  `enseignant_id` int(11) NOT NULL,
  `salle_id` int(11) DEFAULT NULL,
  `jour_id` int(11) NOT NULL,
  `horaire_id` int(11) NOT NULL,
  `mode` enum('online','offline') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `seance`
--

INSERT INTO `seance` (`id_seance`, `semester_seance`, `type_seance`, `niveau_id`, `groupe_id`, `module_id`, `enseignant_id`, `salle_id`, `jour_id`, `horaire_id`, `mode`) VALUES
(153, 2, 'courses', 1, NULL, 68, 35, 109, 6, 4, 'offline'),
(154, 2, 'courses', 1, NULL, 69, 38, 109, 4, 4, 'offline'),
(155, 2, 'courses', 1, NULL, 70, 66, 109, 1, 1, 'offline'),
(156, 2, 'courses', 1, NULL, 71, 39, 109, 4, 1, 'offline'),
(157, 2, 'courses', 1, NULL, 72, 40, NULL, 1, 4, 'online'),
(158, 2, 'courses', 1, NULL, 141, 36, 109, 6, 2, 'offline'),
(159, 2, 'courses', 1, NULL, 141, 36, 109, 2, 3, 'offline'),
(160, 2, 'courses', 1, NULL, 142, 37, 109, 5, 2, 'offline'),
(161, 2, 'supervised_work', 1, 1, 67, 41, 82, 5, 1, 'offline'),
(162, 2, 'supervised_work', 1, 1, 68, 51, 85, 4, 3, 'offline'),
(163, 2, 'supervised_work', 1, 1, 69, 57, 86, 2, 4, 'offline'),
(164, 2, 'supervised_work', 1, 1, 72, 63, 85, 1, 2, 'offline'),
(165, 2, 'supervised_work', 1, 1, 141, 46, 86, 2, 2, 'offline'),
(166, 2, 'supervised_work', 1, 1, 142, 54, 86, 3, 2, 'offline'),
(167, 2, 'pratical_work', 1, 1, 67, 41, 95, 3, 4, 'offline'),
(168, 2, 'pratical_work', 1, 1, 71, 60, 96, 6, 1, 'offline'),
(199, 2, 'supervised_work', 1, 2, 67, 42, 86, 5, 1, 'offline'),
(200, 2, 'supervised_work', 1, 2, 68, 51, 97, 6, 1, 'offline'),
(201, 2, 'supervised_work', 1, 2, 69, 57, 88, 2, 2, 'offline'),
(202, 2, 'supervised_work', 1, 2, 72, 63, 90, 4, 2, 'offline'),
(203, 2, 'supervised_work', 1, 2, 141, 46, 90, 3, 2, 'offline'),
(204, 2, 'supervised_work', 1, 2, 142, 54, 85, 5, 3, 'offline'),
(205, 2, 'pratical_work', 1, 2, 67, 41, 95, 6, 3, 'offline'),
(206, 2, 'pratical_work', 1, 2, 71, 60, 92, 3, 1, 'offline'),
(207, 2, 'supervised_work', 1, 3, 67, 42, 82, 2, 2, 'offline'),
(208, 2, 'supervised_work', 1, 3, 68, 51, 83, 2, 4, 'offline'),
(209, 2, 'supervised_work', 1, 3, 69, 57, 83, 3, 1, 'offline'),
(210, 2, 'supervised_work', 1, 3, 72, 63, 84, 3, 2, 'offline'),
(211, 2, 'supervised_work', 1, 3, 141, 46, 85, 4, 2, 'offline'),
(212, 2, 'supervised_work', 1, 3, 142, 54, 89, 5, 1, 'offline'),
(213, 2, 'pratical_work', 1, 3, 67, 42, 91, 6, 1, 'offline'),
(214, 2, 'pratical_work', 1, 3, 71, 60, 92, 4, 3, 'offline'),
(215, 2, 'supervised_work', 1, 4, 67, 42, 85, 2, 4, 'offline'),
(216, 2, 'supervised_work', 1, 4, 141, 47, 84, 3, 1, 'offline'),
(217, 2, 'supervised_work', 1, 4, 68, 52, 85, 3, 3, 'offline'),
(218, 2, 'supervised_work', 1, 4, 142, 55, 87, 4, 2, 'offline'),
(219, 2, 'supervised_work', 1, 4, 69, 58, 90, 5, 1, 'offline'),
(220, 2, 'supervised_work', 1, 4, 72, 64, 98, 6, 1, 'offline'),
(221, 2, 'pratical_work', 1, 4, 67, 41, 93, 4, 3, 'offline'),
(222, 2, 'pratical_work', 1, 4, 71, 60, 93, 6, 3, 'offline'),
(223, 2, 'supervised_work', 1, 5, 67, 43, 84, 2, 2, 'offline'),
(224, 2, 'supervised_work', 1, 5, 68, 52, 84, 2, 4, 'offline'),
(225, 2, 'supervised_work', 1, 5, 69, 58, 87, 3, 1, 'offline'),
(226, 2, 'supervised_work', 1, 5, 72, 64, 84, 4, 2, 'offline'),
(227, 2, 'supervised_work', 1, 5, 141, 47, 84, 5, 1, 'offline'),
(228, 2, 'supervised_work', 1, 5, 142, 55, 86, 6, 1, 'offline'),
(229, 2, 'pratical_work', 1, 5, 67, 43, 94, 4, 3, 'offline'),
(230, 2, 'pratical_work', 1, 5, 71, 61, 92, 5, 3, 'offline'),
(231, 2, 'supervised_work', 1, 6, 67, 43, 88, 2, 4, 'offline'),
(232, 2, 'supervised_work', 1, 6, 68, 52, 87, 2, 2, 'offline'),
(233, 2, 'supervised_work', 1, 6, 69, 58, 98, 3, 2, 'offline'),
(234, 2, 'supervised_work', 1, 6, 72, 64, 86, 4, 3, 'offline'),
(235, 2, 'supervised_work', 1, 6, 141, 47, 97, 5, 3, 'offline'),
(236, 2, 'supervised_work', 1, 6, 142, 55, 83, 6, 3, 'offline'),
(237, 2, 'pratical_work', 1, 6, 67, 43, 93, 4, 2, 'offline'),
(238, 2, 'pratical_work', 1, 6, 71, 61, 93, 6, 1, 'offline'),
(239, 2, 'supervised_work', 1, 7, 67, 44, 90, 2, 2, 'offline'),
(240, 2, 'supervised_work', 1, 7, 68, 53, 90, 2, 4, 'offline'),
(241, 2, 'supervised_work', 1, 7, 69, 59, 97, 3, 1, 'offline'),
(242, 2, 'supervised_work', 1, 7, 72, 65, 88, 4, 2, 'offline'),
(243, 2, 'supervised_work', 1, 7, 141, 48, 87, 5, 1, 'offline'),
(244, 2, 'supervised_work', 1, 7, 142, 56, 85, 6, 1, 'offline'),
(245, 2, 'pratical_work', 1, 7, 67, 44, 91, 4, 3, 'offline'),
(246, 2, 'pratical_work', 1, 7, 71, 62, 92, 6, 3, 'offline'),
(247, 2, 'supervised_work', 1, 8, 67, 44, 97, 2, 4, 'offline'),
(248, 2, 'supervised_work', 1, 8, 68, 53, 86, 3, 1, 'offline'),
(249, 2, 'supervised_work', 1, 8, 69, 59, 89, 4, 2, 'offline'),
(250, 2, 'supervised_work', 1, 8, 72, 65, 87, 4, 3, 'offline'),
(251, 2, 'supervised_work', 1, 8, 141, 48, 88, 5, 3, 'offline'),
(252, 2, 'supervised_work', 1, 8, 142, 56, 86, 6, 3, 'offline'),
(253, 2, 'pratical_work', 1, 8, 67, 44, 91, 5, 1, 'offline'),
(254, 2, 'pratical_work', 1, 8, 71, 62, 92, 6, 1, 'offline'),
(255, 2, 'supervised_work', 1, 9, 67, 45, 87, 6, 3, 'offline'),
(256, 2, 'supervised_work', 1, 9, 68, 53, 85, 3, 2, 'offline'),
(257, 2, 'supervised_work', 1, 9, 69, 59, 84, 4, 3, 'offline'),
(258, 2, 'supervised_work', 1, 9, 72, 65, 88, 5, 1, 'offline'),
(259, 2, 'supervised_work', 1, 9, 141, 48, 83, 6, 1, 'offline'),
(260, 2, 'supervised_work', 1, 9, 142, 56, 89, 2, 2, 'offline'),
(261, 2, 'pratical_work', 1, 9, 67, 45, 92, 2, 4, 'offline'),
(262, 2, 'pratical_work', 1, 9, 71, 62, 92, 5, 4, 'offline'),
(263, 2, 'supervised_work', 1, 10, 67, 45, 85, 2, 2, 'offline'),
(264, 2, 'supervised_work', 1, 10, 68, 53, 84, 3, 3, 'offline'),
(265, 2, 'supervised_work', 1, 10, 69, 59, 89, 2, 4, 'offline'),
(266, 2, 'supervised_work', 1, 10, 72, 65, 84, 5, 3, 'offline'),
(267, 2, 'supervised_work', 1, 10, 141, 48, 85, 3, 1, 'offline'),
(268, 2, 'supervised_work', 1, 10, 142, 56, NULL, 5, 1, 'offline'),
(269, 2, 'pratical_work', 1, 10, 67, 45, 94, 6, 1, 'offline'),
(270, 2, 'pratical_work', 1, 10, 71, 62, 95, 4, 3, 'offline'),
(272, 2, 'courses', 2, NULL, 88, 69, 108, 4, 2, 'offline'),
(273, 2, 'courses', 2, NULL, 89, 68, 108, 3, 3, 'offline'),
(274, 2, 'courses', 2, NULL, 90, 50, 108, 2, 1, 'offline'),
(275, 2, 'courses', 2, NULL, 91, 70, 108, 6, 3, 'offline'),
(276, 2, 'courses', 2, NULL, 92, 71, 108, 5, 2, 'offline'),
(277, 2, 'courses', 2, NULL, 93, 49, NULL, 1, 4, 'online'),
(278, 2, 'supervised_work', 2, 11, 87, 72, 100, 4, 1, 'offline'),
(279, 2, 'supervised_work', 2, 11, 88, 74, 84, 4, 4, 'offline'),
(280, 2, 'supervised_work', 2, 11, 89, 87, 100, 2, 3, 'offline'),
(281, 2, 'supervised_work', 2, 11, 90, 80, 99, 5, 3, 'offline'),
(282, 2, 'pratical_work', 2, 11, 87, 72, 93, 6, 4, 'offline'),
(283, 2, 'pratical_work', 2, 11, 88, 74, 96, 4, 3, 'offline'),
(284, 2, 'pratical_work', 2, 11, 89, 87, 92, 3, 4, 'offline'),
(285, 2, 'pratical_work', 2, 11, 90, 80, 93, 3, 2, 'offline'),
(286, 2, 'pratical_work', 2, 11, 91, 89, 95, 3, 1, 'offline'),
(287, 2, 'pratical_work', 2, 11, 92, 78, 92, 5, 1, 'offline'),
(288, 2, 'supervised_work', 2, 12, 87, 72, 83, 5, 1, 'offline'),
(289, 2, 'supervised_work', 2, 12, 88, 74, 84, 6, 4, 'offline'),
(290, 2, 'supervised_work', 2, 12, 89, 87, 82, 3, 1, 'offline'),
(291, 2, 'supervised_work', 2, 12, 90, 80, 99, 3, 4, 'offline'),
(292, 2, 'pratical_work', 2, 12, 87, 72, 91, 5, 3, 'offline'),
(293, 2, 'pratical_work', 2, 12, 88, 74, 93, 1, 2, 'offline'),
(294, 2, 'pratical_work', 2, 12, 89, 87, 93, 4, 1, 'offline'),
(295, 2, 'pratical_work', 2, 12, 90, 80, 95, 1, 3, 'offline'),
(296, 2, 'pratical_work', 2, 12, 91, 89, 92, 3, 2, 'offline'),
(297, 2, 'pratical_work', 2, 12, 92, 78, 91, 2, 4, 'offline'),
(298, 2, 'pratical_work', 2, 13, 87, 72, 94, 1, 2, 'offline'),
(299, 2, 'pratical_work', 2, 13, 88, 74, 96, 4, 1, 'offline'),
(300, 2, 'pratical_work', 2, 13, 89, 87, 92, 6, 2, 'offline'),
(301, 2, 'pratical_work', 2, 13, 90, 80, 94, 3, 1, 'offline'),
(302, 2, 'pratical_work', 2, 13, 91, 89, 93, 1, 1, 'offline'),
(303, 2, 'pratical_work', 2, 13, 92, 78, 94, 4, 4, 'offline'),
(304, 2, 'pratical_work', 2, 14, 87, 72, 94, 2, 4, 'offline'),
(305, 2, 'pratical_work', 2, 14, 88, 75, 93, 3, 4, 'offline'),
(306, 2, 'pratical_work', 2, 14, 89, 87, 91, 3, 2, 'offline'),
(307, 2, 'pratical_work', 2, 14, 90, 80, 92, 2, 3, 'offline'),
(308, 2, 'pratical_work', 2, 14, 91, 89, 91, 4, 1, 'offline'),
(309, 2, 'pratical_work', 2, 14, 92, 78, 93, 5, 3, 'offline'),
(310, 2, 'pratical_work', 2, 15, 87, 72, 93, 4, 4, 'offline'),
(311, 2, 'pratical_work', 2, 15, 88, 75, 93, 2, 3, 'offline'),
(312, 2, 'pratical_work', 2, 15, 89, 87, 96, 5, 3, 'offline'),
(313, 2, 'pratical_work', 2, 15, 90, 80, 91, 1, 2, 'offline'),
(314, 2, 'pratical_work', 2, 15, 91, 89, 94, 3, 4, 'offline'),
(315, 2, 'pratical_work', 2, 15, 92, 78, 91, 6, 4, 'offline'),
(316, 2, 'pratical_work', 2, 16, 87, 73, 95, 2, 4, 'offline'),
(317, 2, 'pratical_work', 2, 16, 88, 75, 94, 5, 1, 'offline'),
(318, 2, 'pratical_work', 2, 16, 89, 88, 92, 4, 1, 'offline'),
(319, 2, 'pratical_work', 2, 16, 90, 82, 94, 2, 3, 'offline'),
(320, 2, 'pratical_work', 2, 16, 91, 90, 94, 5, 3, 'offline'),
(321, 2, 'pratical_work', 2, 16, 92, 79, 95, 4, 4, 'offline'),
(322, 2, 'pratical_work', 2, 17, 87, 73, 93, 6, 2, 'offline'),
(323, 2, 'pratical_work', 2, 17, 88, 76, 92, 6, 4, 'offline'),
(324, 2, 'pratical_work', 2, 17, 89, 88, 91, 4, 4, 'offline'),
(325, 2, 'pratical_work', 2, 17, 90, 82, 95, 4, 1, 'offline'),
(326, 2, 'pratical_work', 2, 17, 91, 90, 95, 6, 1, 'offline'),
(327, 2, 'pratical_work', 2, 17, 92, 79, 91, 5, 4, 'offline'),
(328, 2, 'pratical_work', 2, 18, 87, 73, 93, 5, 1, 'offline'),
(329, 2, 'pratical_work', 2, 18, 88, 76, 94, 3, 2, 'offline'),
(330, 2, 'pratical_work', 2, 18, 89, 88, 94, 6, 4, 'offline'),
(331, 2, 'pratical_work', 2, 18, 90, 82, 93, 5, 4, 'offline'),
(332, 2, 'pratical_work', 2, 18, 91, 90, 94, 4, 1, 'offline'),
(333, 2, 'pratical_work', 2, 18, 92, 79, 91, 6, 2, 'offline'),
(334, 2, 'pratical_work', 2, 19, 87, 73, 93, 1, 3, 'offline'),
(335, 2, 'pratical_work', 2, 19, 88, 76, 92, 4, 4, 'offline'),
(336, 2, 'pratical_work', 2, 19, 89, 88, 92, 1, 2, 'offline'),
(337, 2, 'pratical_work', 2, 19, 90, 82, 95, 5, 3, 'offline'),
(338, 2, 'pratical_work', 2, 19, 91, 90, 91, 3, 4, 'offline'),
(339, 2, 'pratical_work', 2, 19, 92, 79, 95, 6, 4, 'offline'),
(340, 2, 'pratical_work', 2, 20, 87, 73, 95, 3, 2, 'offline'),
(341, 2, 'pratical_work', 2, 20, 88, 76, 93, 2, 4, 'offline'),
(342, 2, 'pratical_work', 2, 20, 89, 88, 96, 3, 4, 'offline'),
(344, 2, 'pratical_work', 2, 20, 91, 90, 96, 6, 4, 'offline'),
(345, 2, 'pratical_work', 2, 20, 92, 79, 95, 5, 1, 'offline'),
(346, 2, 'supervised_work', 2, 13, 87, 72, 82, 2, 3, 'offline'),
(347, 2, 'supervised_work', 2, 13, 88, 74, 83, 3, 2, 'offline'),
(348, 2, 'supervised_work', 2, 13, 89, 87, 83, 4, 3, 'offline'),
(349, 2, 'supervised_work', 2, 13, 90, 80, 85, 5, 1, 'offline'),
(350, 2, 'supervised_work', 2, 14, 87, 72, 83, 6, 2, 'offline'),
(351, 2, 'supervised_work', 2, 14, 88, 75, 84, 5, 4, 'offline'),
(352, 2, 'supervised_work', 2, 14, 89, 87, 85, 4, 4, 'offline'),
(353, 2, 'supervised_work', 2, 14, 90, 80, 88, 4, 3, 'offline'),
(354, 2, 'supervised_work', 2, 15, 87, 72, 82, 6, 1, 'offline'),
(355, 2, 'supervised_work', 2, 15, 88, 75, 82, 4, 1, 'offline'),
(356, 2, 'supervised_work', 2, 15, 89, 87, 87, 2, 4, 'offline'),
(357, 2, 'supervised_work', 2, 15, 90, 80, 83, 5, 4, 'offline'),
(358, 2, 'supervised_work', 2, 16, 87, 73, 83, 3, 4, 'offline'),
(359, 2, 'supervised_work', 2, 16, 88, 75, 90, 4, 3, 'offline'),
(360, 2, 'supervised_work', 2, 16, 89, 88, 86, 5, 4, 'offline'),
(361, 2, 'supervised_work', 2, 16, 90, 82, 87, 6, 1, 'offline'),
(362, 2, 'supervised_work', 2, 17, 87, 73, 83, 5, 3, 'offline'),
(363, 2, 'supervised_work', 2, 17, 88, 76, 89, 4, 3, 'offline'),
(364, 2, 'supervised_work', 2, 17, 89, 88, 88, 3, 2, 'offline'),
(365, 2, 'supervised_work', 2, 17, 90, 82, 82, 2, 4, 'offline'),
(366, 2, 'supervised_work', 2, 18, 87, 73, 88, 6, 1, 'offline'),
(367, 2, 'supervised_work', 2, 18, 88, 76, 86, 5, 3, 'offline'),
(368, 2, 'supervised_work', 2, 18, 89, 88, 98, 4, 3, 'offline'),
(369, 2, 'supervised_work', 2, 18, 90, 82, 83, 4, 4, 'offline'),
(370, 2, 'supervised_work', 2, 19, 87, 73, 87, 5, 4, 'offline'),
(371, 2, 'supervised_work', 2, 19, 88, 76, 84, 6, 2, 'offline'),
(372, 2, 'supervised_work', 2, 19, 89, 88, 84, 6, 1, 'offline'),
(373, 2, 'supervised_work', 2, 19, 90, 82, 87, 3, 2, 'offline'),
(374, 2, 'supervised_work', 2, 20, 87, 73, 84, 2, 3, 'offline'),
(375, 2, 'supervised_work', 2, 20, 88, 76, 88, 3, 1, 'offline'),
(376, 2, 'supervised_work', 2, 20, 89, 88, 89, 5, 3, 'offline'),
(377, 2, 'supervised_work', 2, 20, 90, 82, 82, 4, 3, 'offline'),
(398, 2, 'courses', 3, NULL, 104, 91, 108, 5, 1, 'offline'),
(399, 2, 'courses', 3, NULL, 115, 95, NULL, 1, 4, 'online'),
(400, 2, 'supervised_work', 3, 21, 102, 100, 100, 2, 1, 'offline'),
(401, 2, 'supervised_work', 3, 21, 105, 96, 99, 3, 2, 'offline'),
(402, 2, 'pratical_work', 3, 21, 101, 104, 91, 2, 3, 'offline'),
(403, 2, 'pratical_work', 3, 21, 103, 102, 91, 4, 2, 'offline'),
(404, 2, 'pratical_work', 3, 21, 104, 98, 91, 5, 2, 'offline'),
(406, 2, 'pratical_work', 3, 22, 103, 102, 96, 3, 2, 'offline'),
(407, 2, 'pratical_work', 3, 22, 104, 98, 95, 6, 2, 'offline'),
(408, 2, 'supervised_work', 3, 22, 102, 100, 99, 3, 3, 'offline'),
(409, 2, 'supervised_work', 3, 22, 105, 96, 103, 6, 1, 'offline'),
(410, 2, 'supervised_work', 3, 23, 102, 100, 100, 3, 2, 'offline'),
(411, 2, 'supervised_work', 3, 23, 105, 96, 85, 2, 1, 'offline'),
(412, 2, 'pratical_work', 3, 23, 101, 104, 91, 3, 3, 'offline'),
(413, 2, 'pratical_work', 3, 23, 103, 102, 92, 5, 2, 'offline'),
(414, 2, 'pratical_work', 3, 23, 104, 98, 95, 2, 3, 'offline'),
(415, 2, 'pratical_work', 3, 24, 101, 104, 92, 4, 2, 'offline'),
(416, 2, 'pratical_work', 3, 24, 103, 102, 92, 2, 1, 'offline'),
(417, 2, 'pratical_work', 3, 24, 104, 98, 91, 6, 3, 'offline'),
(418, 2, 'supervised_work', 3, 24, 102, 100, 101, 2, 3, 'offline'),
(419, 2, 'supervised_work', 3, 24, 105, 96, 100, 5, 2, 'offline'),
(420, 2, 'supervised_work', 3, 25, 102, 100, 86, 4, 2, 'offline'),
(421, 2, 'supervised_work', 3, 25, 105, 96, 99, 2, 3, 'offline'),
(422, 2, 'supervised_work', 3, 26, 102, 101, 88, 2, 1, 'offline'),
(423, 2, 'supervised_work', 3, 26, 105, 97, 89, 2, 3, 'offline'),
(424, 2, 'pratical_work', 3, 26, 101, 105, 92, 3, 3, 'offline'),
(425, 2, 'pratical_work', 3, 26, 103, 103, 94, 4, 2, 'offline'),
(426, 2, 'pratical_work', 3, 26, 104, 99, 93, 5, 2, 'offline'),
(427, 2, 'pratical_work', 3, 25, 101, 104, 94, 5, 2, 'offline'),
(428, 2, 'pratical_work', 3, 25, 103, 102, 96, 6, 2, 'offline'),
(429, 2, 'pratical_work', 3, 25, 104, 98, 93, 3, 3, 'offline'),
(430, 2, 'supervised_work', 3, 27, 102, 100, 97, 4, 3, 'offline'),
(431, 2, 'supervised_work', 3, 27, 105, 96, 87, 6, 2, 'offline'),
(434, 2, 'pratical_work', 3, 27, 101, 105, 93, 2, 1, 'offline'),
(435, 2, 'pratical_work', 3, 27, 103, 103, 94, 3, 3, 'offline'),
(436, 2, 'pratical_work', 3, 27, 104, 99, 94, 6, 3, 'offline'),
(437, 2, 'pratical_work', 3, 28, 101, 105, 96, 2, 3, 'offline'),
(438, 2, 'pratical_work', 3, 28, 103, 103, 94, 2, 1, 'offline'),
(439, 2, 'pratical_work', 3, 28, 104, 99, 95, 4, 2, 'offline'),
(440, 2, 'supervised_work', 3, 28, 102, 101, 82, 3, 2, 'offline'),
(441, 2, 'supervised_work', 3, 28, 105, 97, 99, 5, 2, 'offline'),
(442, 2, 'supervised_work', 3, 29, 102, 101, 88, 2, 3, 'offline'),
(443, 2, 'supervised_work', 3, 29, 105, 97, 97, 3, 2, 'offline'),
(444, 2, 'pratical_work', 3, 29, 101, 105, 96, 4, 2, 'offline'),
(445, 2, 'pratical_work', 3, 29, 103, 103, 95, 5, 2, 'offline'),
(446, 2, 'pratical_work', 3, 29, 104, 99, 95, 3, 3, 'offline'),
(455, 2, 'pratical_work', 3, 30, 101, 105, 96, 5, 2, 'offline'),
(456, 2, 'pratical_work', 3, 30, 103, 103, 96, 6, 3, 'offline'),
(457, 2, 'pratical_work', 3, 30, 104, 99, 95, 2, 1, 'offline'),
(458, 2, 'supervised_work', 3, 30, 102, 101, 97, 4, 2, 'offline'),
(459, 2, 'supervised_work', 3, 30, 105, 97, 86, 6, 2, 'offline'),
(461, 2, 'courses', 3, NULL, 102, 93, 109, 2, 2, 'offline'),
(462, 2, 'courses', 3, NULL, 103, 94, 108, 4, 1, 'offline'),
(463, 2, 'courses', 1, NULL, 67, 34, 109, 2, 1, 'offline'),
(464, 2, 'pratical_work', 2, 20, 90, 82, 94, 6, 2, 'offline'),
(465, 2, 'courses', 2, NULL, 87, 67, 108, 2, 2, 'offline'),
(466, 2, 'courses', 3, NULL, 101, 92, 108, 3, 1, 'offline'),
(479, 2, 'pratical_work', 3, 22, 101, 104, 91, 2, 1, 'offline'),
(480, 1, 'courses', 1, NULL, 117, 36, 108, 2, 1, 'offline'),
(481, 1, 'courses', 1, NULL, 117, 36, 108, 5, 1, 'offline'),
(482, 1, 'courses', 1, NULL, 135, 37, 108, 4, 1, 'offline'),
(483, 1, 'courses', 1, NULL, 136, 34, 108, 3, 1, 'offline'),
(484, 1, 'courses', 1, NULL, 136, 34, 108, 6, 1, 'offline'),
(485, 1, 'courses', 1, NULL, 137, 35, 108, 2, 2, 'offline'),
(486, 1, 'courses', 1, NULL, 138, 38, 108, 3, 2, 'offline'),
(487, 1, 'courses', 1, NULL, 139, 39, NULL, 1, 4, 'online'),
(488, 1, 'courses', 1, NULL, 140, 40, 109, 1, 1, 'offline'),
(491, 1, 'pratical_work', 1, 1, 136, 34, 91, 3, 3, 'offline'),
(492, 1, 'pratical_work', 1, 1, 136, 34, 91, 4, 2, 'offline');

-- --------------------------------------------------------

--
-- Structure de la table `specialite`
--

CREATE TABLE `specialite` (
  `id_specialite` int(11) NOT NULL,
  `nom_specialite` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `specialite`
--

INSERT INTO `specialite` (`id_specialite`, `nom_specialite`) VALUES
(2, 'GADM'),
(3, 'IATI'),
(4, 'ILC'),
(5, 'RSI'),
(6, 'SEM'),
(7, 'SID'),
(1, 'Sys_Inf');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `administrateur`
--
ALTER TABLE `administrateur`
  ADD PRIMARY KEY (`id_administrateur`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Index pour la table `enseignant`
--
ALTER TABLE `enseignant`
  ADD PRIMARY KEY (`id_enseignant`),
  ADD UNIQUE KEY `matricule` (`matricule`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Index pour la table `etudiant`
--
ALTER TABLE `etudiant`
  ADD PRIMARY KEY (`id_etudiant`),
  ADD UNIQUE KEY `matricule` (`matricule`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `group_id` (`group_id`);

--
-- Index pour la table `groupe`
--
ALTER TABLE `groupe`
  ADD PRIMARY KEY (`id_groupe`),
  ADD UNIQUE KEY `nom_groupe` (`nom_groupe`),
  ADD KEY `niveau_groupe` (`niveau_groupe`),
  ADD KEY `specialite_groupe` (`specialite_groupe`);

--
-- Index pour la table `horaires`
--
ALTER TABLE `horaires`
  ADD PRIMARY KEY (`id_horaires`);

--
-- Index pour la table `jours`
--
ALTER TABLE `jours`
  ADD PRIMARY KEY (`id_jours`);

--
-- Index pour la table `module`
--
ALTER TABLE `module`
  ADD PRIMARY KEY (`id_module`),
  ADD UNIQUE KEY `nom_module` (`nom_module`),
  ADD KEY `niveau_module` (`niveau_module`),
  ADD KEY `specialite_module` (`specialite_module`);

--
-- Index pour la table `module_enseignant`
--
ALTER TABLE `module_enseignant`
  ADD UNIQUE KEY `id_Unique` (`enseignant_id`,`module_id`,`type_module`) USING BTREE,
  ADD KEY `enseignant_id` (`enseignant_id`),
  ADD KEY `module_id` (`module_id`);

--
-- Index pour la table `niveau`
--
ALTER TABLE `niveau`
  ADD PRIMARY KEY (`id_niveau`),
  ADD UNIQUE KEY `nom_niveau` (`nom_niveau`);

--
-- Index pour la table `salle`
--
ALTER TABLE `salle`
  ADD PRIMARY KEY (`id_salle`),
  ADD UNIQUE KEY `nom_salle` (`nom_salle`);

--
-- Index pour la table `seance`
--
ALTER TABLE `seance`
  ADD PRIMARY KEY (`id_seance`),
  ADD UNIQUE KEY `jour_horaire_salle_unique` (`semester_seance`,`salle_id`,`jour_id`,`horaire_id`) USING BTREE,
  ADD UNIQUE KEY `jour_horaire_groupe_unique` (`semester_seance`,`groupe_id`,`jour_id`,`horaire_id`) USING BTREE,
  ADD UNIQUE KEY `jour_horaire_enseignant_unique` (`semester_seance`,`enseignant_id`,`jour_id`,`horaire_id`) USING BTREE,
  ADD KEY `horaire_id` (`horaire_id`),
  ADD KEY `jour_id` (`jour_id`),
  ADD KEY `module_id` (`module_id`),
  ADD KEY `enseignant_id` (`enseignant_id`) USING BTREE,
  ADD KEY `salle_id` (`salle_id`) USING BTREE,
  ADD KEY `groupe_id` (`groupe_id`),
  ADD KEY `niveau_id` (`niveau_id`);

--
-- Index pour la table `specialite`
--
ALTER TABLE `specialite`
  ADD PRIMARY KEY (`id_specialite`),
  ADD UNIQUE KEY `nom_specialite` (`nom_specialite`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `administrateur`
--
ALTER TABLE `administrateur`
  MODIFY `id_administrateur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `enseignant`
--
ALTER TABLE `enseignant`
  MODIFY `id_enseignant` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=115;

--
-- AUTO_INCREMENT pour la table `etudiant`
--
ALTER TABLE `etudiant`
  MODIFY `id_etudiant` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=453;

--
-- AUTO_INCREMENT pour la table `groupe`
--
ALTER TABLE `groupe`
  MODIFY `id_groupe` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT pour la table `horaires`
--
ALTER TABLE `horaires`
  MODIFY `id_horaires` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `jours`
--
ALTER TABLE `jours`
  MODIFY `id_jours` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `module`
--
ALTER TABLE `module`
  MODIFY `id_module` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=145;

--
-- AUTO_INCREMENT pour la table `niveau`
--
ALTER TABLE `niveau`
  MODIFY `id_niveau` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `salle`
--
ALTER TABLE `salle`
  MODIFY `id_salle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;

--
-- AUTO_INCREMENT pour la table `seance`
--
ALTER TABLE `seance`
  MODIFY `id_seance` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=493;

--
-- AUTO_INCREMENT pour la table `specialite`
--
ALTER TABLE `specialite`
  MODIFY `id_specialite` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `etudiant`
--
ALTER TABLE `etudiant`
  ADD CONSTRAINT `etudiant_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groupe` (`id_groupe`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `groupe`
--
ALTER TABLE `groupe`
  ADD CONSTRAINT `groupe_ibfk_1` FOREIGN KEY (`niveau_groupe`) REFERENCES `niveau` (`id_niveau`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `groupe_ibfk_2` FOREIGN KEY (`specialite_groupe`) REFERENCES `specialite` (`id_specialite`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `module`
--
ALTER TABLE `module`
  ADD CONSTRAINT `module_ibfk_1` FOREIGN KEY (`niveau_module`) REFERENCES `niveau` (`id_niveau`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `module_ibfk_2` FOREIGN KEY (`specialite_module`) REFERENCES `specialite` (`id_specialite`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `module_enseignant`
--
ALTER TABLE `module_enseignant`
  ADD CONSTRAINT `module_enseignant_ibfk_1` FOREIGN KEY (`enseignant_id`) REFERENCES `enseignant` (`id_enseignant`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `module_enseignant_ibfk_2` FOREIGN KEY (`module_id`) REFERENCES `module` (`id_module`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `seance`
--
ALTER TABLE `seance`
  ADD CONSTRAINT `seance_ibfk_1` FOREIGN KEY (`enseignant_id`) REFERENCES `enseignant` (`id_enseignant`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `seance_ibfk_2` FOREIGN KEY (`groupe_id`) REFERENCES `groupe` (`id_groupe`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `seance_ibfk_3` FOREIGN KEY (`horaire_id`) REFERENCES `horaires` (`id_horaires`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `seance_ibfk_4` FOREIGN KEY (`jour_id`) REFERENCES `jours` (`id_jours`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `seance_ibfk_5` FOREIGN KEY (`module_id`) REFERENCES `module` (`id_module`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `seance_ibfk_6` FOREIGN KEY (`salle_id`) REFERENCES `salle` (`id_salle`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `seance_ibfk_7` FOREIGN KEY (`niveau_id`) REFERENCES `niveau` (`id_niveau`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

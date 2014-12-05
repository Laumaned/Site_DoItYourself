-- phpMyAdmin SQL Dump
-- version 3.3.7deb7
-- http://www.phpmyadmin.net
--
-- Serveur: localhost
-- Généré le : Ven 05 Décembre 2014 à 01:00
-- Version du serveur: 5.1.63
-- Version de PHP: 5.3.3-7+squeeze13

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT=0;
START TRANSACTION;


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `humanitaria`
--

-- --------------------------------------------------------

--
-- Structure de la table `alerte`
--

CREATE TABLE IF NOT EXISTS `alerte` (
  `id_alerte` int(11) NOT NULL AUTO_INCREMENT,
  `nom_alerte` varchar(64) NOT NULL,
  PRIMARY KEY (`id_alerte`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Contenu de la table `alerte`
--


-- --------------------------------------------------------

--
-- Structure de la table `camp`
--

CREATE TABLE IF NOT EXISTS `camp` (
  `id_camp` int(11) NOT NULL,
  `id_ville` int(11) NOT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  PRIMARY KEY (`id_camp`),
  FOREIGN KEY `FK_camp` (`id_ville`)REFERENCES `ville`(`id_ville`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
--
-- Contenu de la table `camp`
--


-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

CREATE TABLE IF NOT EXISTS `categorie` (
  `id_categorie` int(11) NOT NULL AUTO_INCREMENT,
  `nom_categorie` varchar(64) NOT NULL,
  PRIMARY KEY (`id_categorie`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Contenu de la table `categorie`
--


-- --------------------------------------------------------

--
-- Structure de la table `etat`
--

CREATE TABLE IF NOT EXISTS `etat` (
  `id_etat` int(11) NOT NULL AUTO_INCREMENT,
  `nom_etat` varchar(64) NOT NULL,
  `id_type` int(11) NOT NULL,
  PRIMARY KEY (`id_etat`),
  FOREIGN KEY `FK_etat` (`id_type`)REFERENCES `type`(`id_type`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Contenu de la table `etat`
--


-- --------------------------------------------------------

--
-- Structure de la table `groupe_sanguin`
--

CREATE TABLE IF NOT EXISTS `groupe_sanguin` (
  `id_groupe_sanguin` int(11) NOT NULL AUTO_INCREMENT,
  `nom_groupe_sanguin` varchar(3) NOT NULL,
  PRIMARY KEY (`id_groupe_sanguin`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Contenu de la table `groupe_sanguin`
--


-- --------------------------------------------------------

--
-- Structure de la table `medicament`
--

CREATE TABLE IF NOT EXISTS `medicament` (
  `id_medicament` int(11) NOT NULL AUTO_INCREMENT,
  `nom_medicament` varchar(64) NOT NULL,
  PRIMARY KEY (`id_medicament`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Contenu de la table `medicament`
--


-- --------------------------------------------------------

--
-- Structure de la table `medicament_camp`
--

CREATE TABLE IF NOT EXISTS `medicament_camp` (
  `id_camp` int(11) NOT NULL,
  `id_medicament` int(11) NOT NULL,
  `quantite` int(11) NOT NULL,
  FOREIGN KEY `FK_medicament_camp1` (`id_camp`)REFERENCES `camp`(`id_camp`),
  FOREIGN KEY `FK_medicament_camp2` (`id_medicament`)REFERENCES `medicament`(`id_medicament`),
  KEY `FK_medicament_camp2` (`id_medicament`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Contenu de la table `medicament_camp`
--


-- --------------------------------------------------------

--
-- Structure de la table `nourriture`
--

CREATE TABLE IF NOT EXISTS `nourriture` (
  `id_nourriture` int(11) NOT NULL AUTO_INCREMENT,
  `nom_nourriture` varchar(64) NOT NULL,
  PRIMARY KEY (`id_nourriture`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Contenu de la table `nourriture`
--


-- --------------------------------------------------------

--
-- Structure de la table `nourriture_camp`
--

CREATE TABLE IF NOT EXISTS `nourriture_camp` (
  `id_camp` int(11) NOT NULL,
  `id_nourriture` int(11) NOT NULL,
  `quantite` int(11) NOT NULL,
  FOREIGN KEY `FK_nourriture_camp1` (`id_camp`)REFERENCES `camp`(`id_camp`),
  FOREIGN KEY `FK_medicament_camp2` (`id_nourriture`)REFERENCES `nourriture`(`id_nourriture`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Contenu de la table `nourriture_camp`
--


-- --------------------------------------------------------

--
-- Structure de la table `pays`
--

CREATE TABLE IF NOT EXISTS `pays` (
  `id_pays` int(11) NOT NULL AUTO_INCREMENT,
  `nom_pays` varchar(64) NOT NULL,
  PRIMARY KEY (`id_pays`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Contenu de la table `pays`
--


-- --------------------------------------------------------

--
-- Structure de la table `personne`
--

CREATE TABLE IF NOT EXISTS `personne` (
  `id_personne` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(64) NOT NULL,
  `prenom` varchar(64) NOT NULL,
  `age` int(11) NOT NULL,
  `id_groupe_sanguin` int(11) NOT NULL,
  `id_camp` int(11) NOT NULL,
  `id_categorie` int(11) NOT NULL,
  PRIMARY KEY (`id_personne`),
  FOREIGN KEY `FK_personne1` (`id_groupe_sanguin`)REFERENCES `groupe_sanguin`(`id_groupe_sanguin`),
  FOREIGN KEY `FK_personne2` (`id_camp`)REFERENCES `camp`(`id_camp`),
  FOREIGN KEY `FK_personne3` (`id_categorie`)REFERENCES `categorie`(`id_categorie`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Contenu de la table `personne`
--


-- --------------------------------------------------------

--
-- Structure de la table `personne_etat`
--

CREATE TABLE IF NOT EXISTS `personne_etat` (
  `id_personne` int(11) NOT NULL,
  `id_etat` int(11) NOT NULL,
  FOREIGN KEY `FK_personne_etat1` (`id_personne`)REFERENCES `personne`(`id_personne`),
  FOREIGN KEY `FK_personne_etat2` (`id_etat`)REFERENCES `etat`(`id_etat`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Contenu de la table `personne_etat`
--


-- --------------------------------------------------------

--
-- Structure de la table `type_etat`
--

CREATE TABLE IF NOT EXISTS `type_etat` (
  `id_type` int(11) NOT NULL AUTO_INCREMENT,
  `nom_type` varchar(64) NOT NULL,
  PRIMARY KEY (`id_type`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Contenu de la table `type_etat`
--


-- --------------------------------------------------------

--
-- Structure de la table `ville`
--

CREATE TABLE IF NOT EXISTS `ville` (
  `id_ville` int(11) NOT NULL,
  `id_pays` int(11) NOT NULL,
  `nom_ville` varchar(64) NOT NULL,
  PRIMARY KEY (`id_ville`),
  FOREIGN KEY `FK_ville_pays` (`id_pays`)REFERENCES `pays`(`id_pays`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Contenu de la table `ville`
--


-- --------------------------------------------------------

--
-- Structure de la table `ville_alerte`
--

CREATE TABLE IF NOT EXISTS `ville_alerte` (
  `id_ville` int(11) NOT NULL,
  `id_alerte` int(11) NOT NULL,
  FOREIGN KEY `FK_ville_alerte1` (`id_ville`)REFERENCES `ville`(`id_ville`),
<<<<<<< HEAD
  KEY `FK_ville_alerte2` (`id_alerte`),
=======
>>>>>>> caad8f78aea9f127f051fbb05148347e6682fc79
  FOREIGN KEY `FK_ville_alerte2` (`id_alerte`)REFERENCES `alerte`(`id_alerte`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Contenu de la table `ville_alerte`
--

COMMIT;



DROP TABLE IF EXISTS `channel_meta`;
CREATE TABLE IF NOT EXISTS `channel_meta` (
  `name` varchar(255) NOT NULL,
  `data` text NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


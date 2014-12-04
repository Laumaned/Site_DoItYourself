Les URL de fichiers renvoient le fichier en question
Les URL de dossiers sont traitées et formaté par Apache via le .htacces

Toutes les autres URL executent un .php associé

Les URL sont découpées en niveaux par les "/" puis confiées au controleur correspondant au premier niveau.
Exemple : "monsite.com/User/view/toto" sera confiée au controller User.php et sa fonction "get_view" sera appelée

Les controllers doivent se trouver dans le dossier /src/

Si un controller n'est pas trouvé, le controlleur "Page" est invoqué a la place
Si la fonction demandée n'existe pas, la fonction "get_default" est invoquée a la place
Exemple : "monsite.com/" sera confié a la fonction "get_default" du controleur "Page"
Exemple : "monsite.com/test" sera confié a la fonction "get_default" du controleur "test"
Exemple : "monsite.com/test/ca" sera confié a la fonction "get_ca" du controleur "test"

Le controller "Page" génére des pages listant sous forme hierarchique, les fichiers présent dans le dossier /web/public/page 
Le contenu de ces page est le fichier passé dans l'URL ou a default, la page Accueil.html
Les fichiers cachés (commencant par un ".") ne sont pas listé mais restent accessible par URL
Il est possible de créer des lien symbolique pour faire lister des fichiers externe au dossier /page/

Le controller "v1" est en charge des interaction avec la bases de donnée.
Un descriptif des fonctions proposées par v1 est disponible a l'adresse "/v1"

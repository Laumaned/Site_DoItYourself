Les URL de fichiers renvoient le fichier en question
Les URL de dossiers sont trait�es et format� par Apache via le .htacces

Toutes les autres URL executent un .php associ�

Les URL sont d�coup�es en niveaux par les "/" puis confi�es au controleur correspondant au premier niveau.
Exemple : "monsite.com/User/view/toto" sera confi�e au controller User.php et sa fonction "get_view" sera appel�e

Les controllers doivent se trouver dans le dossier /src/

Si un controller n'est pas trouv�, le controlleur "Page" est invoqu� a la place
Si la fonction demand�e n'existe pas, la fonction "get_default" est invoqu�e a la place
Exemple : "monsite.com/" sera confi� a la fonction "get_default" du controleur "Page"
Exemple : "monsite.com/test" sera confi� a la fonction "get_default" du controleur "test"
Exemple : "monsite.com/test/ca" sera confi� a la fonction "get_ca" du controleur "test"

Le controller "Page" g�n�re des pages listant sous forme hierarchique, les fichiers pr�sent dans le dossier /web/public/page 
Le contenu de ces page est le fichier pass� dans l'URL ou a default, la page Accueil.html
Les fichiers cach�s (commencant par un ".") ne sont pas list� mais restent accessible par URL
Il est possible de cr�er des lien symbolique pour faire lister des fichiers externe au dossier /page/

Le controller "v1" est en charge des interaction avec la bases de donn�e.
Un descriptif des fonctions propos�es par v1 est disponible a l'adresse "/v1"

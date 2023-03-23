import axios from 'axios'
import { useEffect, useState } from 'react'

function Home() {
    //UseState : un peu comme des variables que tu vas pouvoir utiliser a travers tout ton code.
    //Si tu changes une variable dans une function alors sa valeur sera changee seulement dans le scope de la fonction.
    //Avec le UseState, ca change la valeur de la variable a travers tout le code.
    //La premiere partie entre crochet (comme error, loading ou allUsers etc par exemple ici) c'est comme le nom de la variable,
    //et la 2eme partie (comme setError,  setLoading, getAllUsers etc par exemple ici) c'est un peu comme un "fonction" qui te permet de change la valeur de ta variable

    //Error sert a recuperer une eventuelle erreur qu'il y aurait eu pendant la requete et l'afficher sur la page de notre site
    const [error, setError] = useState<any>('')
    //loading permet d'afficher que la recuperation des donnees est en cours, en gros, ca charge
    //Tu vois ici aussi que entre les parenthese apres UseState, on peut donner une valeur et type a notre variable. Ici, loading est un boolean.
    //Ca peut aussi etre un tableau ou pleins d'autres trucs. Pour error et allUsers, la valeur est vide au debut
    const [loading, setLoading] = useState(true)
    const [allUsers, getAllUsers] = useState<any>('')

    const [errorFriend, setErrorFriend] = useState<any>('')
    const [loadingFriend, setLoadingFriend] = useState(true)
    const [allFriends, getAllFriends] = useState<any>('')

    const [errorChange, setErrorChange] = useState<any>('')

    const [errorPost, setErrorPost] = useState<any>('')

    const [errorDelete, setErrorDelete] = useState<any>('')

    //Requete 1. : une requete GET (qui permet juste de recuperer les donnees) sans token car le token sert a dire a la base de donnee quel User tu es.
    //Ici, on recup les donnees de toute le monde, pas besoin de dire qui on est
    useEffect(() => {
        //async pour dire que cest une requete asynchrone
        const fetchData = async () => {
            //on met loading a true pour dire que cest encore en train de charger (on verra plus tard comment marche l'affichage sur notre page)
            setLoading(true)
            //await qui va avec async, le chargement de la requete n'empeche pas que le reste du code soit lu
            //On utilie l'outil axios (importé au debut dans les import)
            await axios
                //la requete : une fait une requete get. pour savoir ce qu'on met entre les parenthese, cest pareil que sur swagger.
                //On prend ce qu'il y a dans request URL, apres http://localhost:4000 (+ d'explications dans le word)
                .get(`/users/`)
                //on obtient la reponse
                .then((response) => {
                    //on stock la response dans notre useState allUsers. On a change sa valeur grace au UseState et a la "fonction" getAllUsers
                    getAllUsers(response.data)
                    //On met le bool de loading a false car on a recup la reponse et charge plus
                    setLoading(false)
                })
                .catch((err) => {
                    console.log(err.message)
                    //S'il ya une erreur, on le met dans notre UseState error
                    setError(err.message)
                })
        }
        fetchData()
    }, [])
    //juste pour voir ce qu'on a recupere dans notre variable allUsers
    console.log(allUsers)

    //Requete 2. : une requete GET (qui permet juste de recuperer les donnees) avec token.
    //On va recuperer la liste d'amis d'un user. Pour que la database sache de quel user on parle, on met son token.
    //Plus tard ca sera automatise mais je me suis pas encore penchee dessus
    const config = {
        headers: {
            Authorization:
                `Bearer ` +
                //Ici le token. Attention les guillemets sont des ` et pas des '
                `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWQ0MiI6ImFtb250YXV0IiwiaWF0IjoxNjc5NTgyMjk0LCJleHAiOjE2Nzk2MTgyOTR9.Ms7q2nRVIbxOvTb2-KDZpmmEKTRMszi6PTsOpeahbWE`,
        },
    }
    useEffect(() => {
        const fetchData = async () => {
            setLoadingFriend(true)
            await axios
                //Ici toujours un requet get, on prend la meme chose que ce qu'on voit dans Swagger. {id} dans swagger est
                //remplace par l'id de l'user qui nous interresse. Ensuite, on rajoute config, avec le token de l'user qui nous interesse
                .get(`users/1/get_friends`, config)
                .then((response) => {
                    getAllFriends(response.data)
                    setLoadingFriend(false)
                })
                .catch((err) => {
                    console.log(err.message)
                    setErrorFriend(err.message)
                })
                .finally(() => {
                    setLoadingFriend(false)
                })
        }
        fetchData()
    }, [])

    //On peut voir ce qu'il y a dans notre variable allUsers
    // console.log(allFriends)

    //Requete 3. : une requete PATCH qui permet de changer quelque chose dans une ligne de notre database
    //Je la mets dans une fonction car tout ca va s'effectue au click sur un bouton
    function changeIt() {
        const fetchData = async () => {
            await axios
                //On utilise patch et entre {} on met le champs a changer et sa valeur.
                //ici, javoue je sais pas trop pourquoi ca me demande pas le token
                .patch(`/users/1`, { username: 'une valeur', id42: 'amontaut' })
                .then((response) => {
                    //je mets une alerte pour me dire que c'est passe
                    alert('Username changed')
                })
                .catch((err) => {
                    console.log(err.message)
                    setErrorChange(err.message)
                })
        }
        fetchData()
    }

    //Requete 4. : une requete POST qui permet d'ajouter une ligne dans une table
    //Faite dans une function supplementaire car excetuee sur click d'un bouton
    function addIt() {
        const fetchData = async () => {
            await axios
                //on utilise post pour ajouter une ligne
                .post(
                    //On suis la requete de swagger. Ici, l'user 1 (identifie grace au token dans config) block l'user 2,
                    //comme on le voit entre les`` dans la requete
                    `/users/2/add_blocked`,
                    //Parfois, il faut mettre cette ligne la. Je sais pas trop pourquoi. Une fois j'ai eu un erreur, jai lu sur stackoverflow qu'il fallait
                    //mettre ca et ca a marche. J'avoue jai pas cherche porquoi
                    { withCredentials: true },
                    //le token
                    config
                )
                //Si tu fais une requete post et qu'il faut passer qqch en parametre, ca va ressembler a qqch comme ca
                //Par exemple pour creer un chan sur le chat, il faut bien donner un nom et dire si l'acces est public, privee ou protected
                // .post(
                //     `/channels/1`,
                //     {
                //         name: 'valeur 1',
                //         access: 'public',
                //     },
                //     config
                // )
                .then((response) => {
                    //Je met un console log pour dire que cest passe
                    console.log('ajoute')
                })
                .catch((err) => {
                    console.log(err.message)
                    setErrorPost(err.message)
                })
        }
        fetchData()
    }

    // //Requete 5. : une requete DELETE qui permet de supprimer une ligne dans notre table
    function deleteIt() {
        const fetchData = async () => {
            await axios
                .delete(`users/7`)
                .then((response) => {
                    //Je met un console log pour dire que cest passe
                    console.log('supprime')
                })
                .catch((err) => {
                    console.log(err.message)
                    setErrorDelete(err.message)
                })
                .finally(() => {})
        }
        fetchData()
    }

    return (
        //Ici, on met du HTML melange a du react. Le react est entre {}
        <div>
            <p>
                <b>Requete 1 GET allUsers</b>
            </p>
            {/* Ici, on met un ternaire. Les ternaires peuvent s'ecrire soit :
			(if (condition) ? trucAFaire1 : trucAFaire2)
			OU BIEN, s'il n'y a rien a faire si la condition n'est pas remplie (donc pas de trucAFaire2): 
			(if (condition) ? trucAFaire1 : null)
			Qui peut se simplifier par : 
			(if (condition) && trucAFaire1)
			Donc ici, cest ce qu'on fait, on dit si notre variable loading est true, alors on affiche Loading ... */}
            {loading && <p>Loading ... </p>}

            {/* ici, aussi un ternaire mais on a plusieurs conditions : On dit si loading est a false (donc ca charge plus)
			et que notre variable error est = a quelque chose (il n'est pas vite) alors on affiche la variable error
			donc l'erreur qu'on a recu pendant la requete */}
            {!loading && error && <p>{error}</p>}

            {/* Un autre ternaire, si c'est pas en train de charger et qu'il n'y a pas d'erreur alors on affiche ce qu'on veut afficher !  */}
            {!loading &&
                !error &&
                // Dans les return en react, les map sont un moyen de faire une boucle. Donc la grace a la boucle (enfin la map),
                // on va pouvoir afficher le contenu de notre varaible allUsers
                //A la place de request, tu peux mettre n'importe quel nom. Cest juste pour faire une key
                allUsers?.map((request: any) => (
                    <li key={request.username}>
                        {/* La j'affiche ce que je veux. Dans ma variable allUsers il y a plusieurs champs, qui sont ceux de la base de donnees.
					Donc toutes les donnees de la db Users sont accessible : id, id42, username, avatar etc */}
                        {request.username}, {request.id}
                    </li>
                ))}

            <p>
                <b>Requete 2 GET friends de l'user 1 </b>
            </p>
            {loadingFriend && <p>Loading ... </p>}
            {!loadingFriend && errorFriend && <p>{errorFriend}</p>}
            {!loadingFriend &&
                !errorFriend &&
                allFriends.friends?.map((request: any) => (
                    <li key={request.username}>
                        {request.username}, {request.id}
                    </li>
                ))}

            <p>
                <b>Requete 3 PATCH pour modifier une valeur</b>
            </p>
            {/* ici pas de loading car il ne serai change en false qu'une fois la requete effectuee donc apres qu'on ai clique sur le bouton */}
            {errorChange && <p>{errorChange}</p>}
            {!errorChange && (
                //On peut ajouter des evenement sur des elements html comme onclick, onChange etc...
                //Ici j'utilise onClick et donc quand on click, ca declanche la fonction en parametre (donc changeIt)
                <button onClick={changeIt}>Test change name</button>
            )}
            {/* After clicking on the button, you can reaload the adminer page localhost 8080 and the things wil be changed */}

            <p>
                <b>Requete 4 POST pour ajouter une donnee</b>
            </p>
            {/* ici pas de loading car il ne serai change en false qu'une fois la requete effectuee donc apres qu'on ai clique sur le bouton */}
            {errorChange && <p>{errorChange}</p>}
            {!errorChange && (
                <button onClick={addIt}>l'User 1 block l'user 2</button>
            )}
            {/* After clicking on the button, you can reaload the adminer page localhost 8080 and the things wil be changed */}

            <p>
                <b>Requete 5 DELETE pour effacer une donnee</b>
            </p>
            {/* ici pas de loading car il ne serai change en false qu'une fois la requete effectuee donc apres qu'on ai clique sur le bouton */}
            {errorDelete && <p>{errorDelete}</p>}
            {!errorDelete && (
                <button onClick={deleteIt}>Je supprime l'user 7</button>
            )}
            {/* After clicking on the button, you can reaload the adminer page localhost 8080 and the things wil be changed */}
        </div>
    )
}

export default Home

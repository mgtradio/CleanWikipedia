import React, { useState } from 'react';
import axios from 'axios'
import {
    Jumbotron, InputGroup, InputGroupAddon, Input, Button,
    Card, CardText, CardBody, CardTitle,
} from 'reactstrap';

const Content = () => {
    const [input, setInput] = useState()
    const [copy, setCopy] = useState('')
    const [bio, setBio] = useState({ title: 'Aguardando...', bio: '' })

    const camelize = (str) => {
        return str.split(' ').map(function (word, index) {
            if (index == 0) {
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            }
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join('%20');
    }

    const copyText = () => {
        let text = document.getElementById("bio").innerText;
        let dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        setCopy('Copiado')
    }

    const handleSearch = () => {
        setCopy('Copiar')
        let url = 'https://pt.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=extracts&explaintext&redirects=1&titles=' + camelize(input)
        axios.get(url).then(res => {
            let id = Object.keys(res.data.query.pages)[0];
            setBio({
                title: res.data.query.pages[id].title,
                bio: res.data.query.pages[id].extract
            })
        }).catch(() => {
            setBio({
                title: 'Tente novamente.',
                bio: 'Nada encontrado'
            })
        })
    }

    return (
        <div className="p-1">
            <Jumbotron className="m-0 mb-2 p-2">
                <h1 className="display-4">CleanText WikiPedia</h1>
                <p className="lead">
                    Pesquisar artigo</p>
                <hr className="my-2" />
                <InputGroup>
                    <Input onChange={(e) => setInput(e.target.value)} placeholder="Digite um termo." />
                    <InputGroupAddon addonType="append">
                        <Button onClick={handleSearch}>BUSCAR</Button>
                    </InputGroupAddon>
                </InputGroup>
            </Jumbotron>

            <Card>
                <CardBody>
                    <CardTitle><h2 className="text-center">{bio.title}</h2></CardTitle>
                </CardBody>
                <CardBody>
                    <p className="text-right"><a onClick={copyText}>{copy}</a></p>
                    <div id="bio">
                        <CardText dangerouslySetInnerHTML={{ __html: bio.bio?.replace(/\n/g, '<br>') }} />
                        <p>Fonte: Wikpedia</p>
                    </div>
                    <a href="https://www.facebook.com/gerinaldo.silva">Desenvolvido por GDev</a>
                </CardBody>
            </Card>
        </div>
    );
};

export default Content;
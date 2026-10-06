import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert, Image } from 'react-native'
import * as ImagePicker from "expo-image-picker"

type CadastroRestauranteProps = {
    continuar: (nome: string, descricao: string, foto: string | null
    ) => void
}

export function CadastroRestaurante({ continuar }: CadastroRestauranteProps) {
    const [nome, setnome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [foto, setfoto] = useState<string | null>(null)
    const [informacoesFoto, setinformacoesFoto] = useState<{
        largura: number,
        altura: number,
        tamanho: number | null,
        tipo: string | null
    } | null>(null)

    async function escolherFoto() {
        const fotos = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,

        }
        )
        if (fotos.canceled) {
            return
        }
        const imagem = fotos.assets[0]
        setfoto(imagem.uri)

        setinformacoesFoto({
            largura: imagem.width,
            altura: imagem.height,
            tamanho: imagem.fileSize ?? null,
            tipo: imagem.mimeType ?? null
        })
    }



    async function cameraFoto() {
        const Permissao = await ImagePicker.requestCameraPermissionsAsync()
        if (!Permissao.granted) {
            Alert.alert(
                'Permissão de acesso a camera'
            )
            return
        }

        const camera = await ImagePicker.launchCameraAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1
        })
        if (camera.canceled) {
            return
        }
        const imagem = camera.assets[0]
        setfoto(imagem.uri)

        setinformacoesFoto({
            largura: imagem.width,
            altura: imagem.height,
            tamanho: imagem.fileSize ?? null,
            tipo: imagem.mimeType ?? null
        })
    }

    function escolhaDeAdicaoDeFoto() {
        Alert.alert(
            'Adicionar foto', // Título
            'Escolha uma opção', // Mensagem opcional
            [
                {
                    text: 'Tirar foto',
                    onPress: cameraFoto, // Função que será chamada
                },
                {
                    text: 'Escolher da galeria',
                    onPress: escolherFoto,
                },
                {
                    text: 'Cancelar',
                    style: 'cancel', // Aqui precisa ser string
                },
            ],
            { cancelable: true } // Permite fechar tocando fora
        );
    }

    function escolhaDaFoto() {
        Alert.alert(
            'Adicionar foto',
            'Escolha uma opção',
            [
                {
                    text: 'Tirar foto',
                    onPress: cameraFoto,
                },
                {
                    text: 'Escolher da galeria',
                    onPress: escolherFoto,
                },
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
            ],
            { cancelable: true }
        );
    }



    function concluirCadastro() {
        if (!nome.trim() || !descricao.trim()) {
            Alert.alert("ATENÇAO : Preencha todos os campos para continuar")
            return
        }
        continuar(
            nome.trim(),
            descricao.trim(),
            foto
        )
    }
    return (
        <View style={styles.tela}>
            <Text style={styles.titulo}>
                Cadastre seu Restaurante
            </Text>
            <Text style={styles.subtitulo}>
                Crie o perfil do seu Restaurante !
            </Text>
            <Pressable style={styles.foto}
                onPress={escolhaDaFoto}>
                {foto ? (<Image
                    source={{ uri: foto }}
                    style={styles.imagem} />) : (<>
                        <Text style={styles.botaoImagem}>
                            Adicionar foto
                        </Text>
                    </>)}

            </Pressable>
            {informacoesFoto && (
                <View style={styles.informacoesFoto}>
                    <Text style={styles.tituloInformacoes}>
                        📁 Informações do arquivo
                    </Text>

                    <Text style={styles.textoInformacoes}>
                        Dimensão: {informacoesFoto.largura} x {informacoesFoto.altura}
                    </Text>

                    <Text style={styles.textoInformacoes}>
                        Tipo: {informacoesFoto.tipo ?? 'Não informado'}
                    </Text>

                    <Text style={styles.textoInformacoes}>
                        Tamanho:{' '}
                        {informacoesFoto.tamanho
                            ? `${(informacoesFoto.tamanho / 1024 / 1024).toFixed(2)} MB`
                            : 'Não informado'}
                    </Text>
                </View>
            )}
            <TextInput style={styles.input}
                placeholder='Nome do restaurante'
                value={nome}
                onChangeText={setnome} />

            <TextInput style={styles.input}
                multiline
                placeholder="Descrição"
                value={descricao}
                onChangeText={setDescricao}
            />
            <Pressable style={styles.botao} onPress={concluirCadastro}>
                <Text style={styles.textoBotao}>
                    Cadastrar
                </Text>

            </Pressable>
        </View>
    )

}
const styles = StyleSheet.create({
    tela: {
        flex: 1,
        backgroundColor: '#F6F2FC',
        padding: 22,
        paddingTop: 60,
    },

    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#452477',
    },

    subtitulo: {
        fontSize: 14,
        color: '#796A99',
        marginTop: 8,
        marginBottom: 30,
    },

    foto: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#EAE1FA',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },

    icone: {
        fontSize: 30,
    },

    textoFoto: {
        color: '#7043B8',
        fontSize: 12,
        marginTop: 5,
    },

    input: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E3D9F5',
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 15,
        marginBottom: 15,
    },

    inputDescricao: {
        height: 100,
        textAlignVertical: 'top',
    },

    botao: {
        backgroundColor: '#7043B8',
        paddingVertical: 16,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 10,
    },

    textoBotao: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    imagem: {
        width: '100%',
        height: '100%',
        borderRadius: 60
    },
    botaoImagem: {
        paddingVertical: 16,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 10,

    },
    informacoesFoto: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 15,
    marginTop: 15,
    width: '100%',
},

tituloInformacoes: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#452477',
    marginBottom: 8,
},

textoInformacoes: {
    fontSize: 13,
    color: '#796A99',
    marginTop: 4,
},
});
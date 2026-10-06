import * as ImagePicker from "expo-image-picker"
import { useState } from "react"
import { Alert, View, Text, TextInput, Pressable, Image, FlatList ,StyleSheet} from "react-native"


export type CadastroItemProp = {
    itens: Item[]
    adicionarItem: (novoItem : Item) => void
    paraVoltar: () => void
}


export type Item = {
    id: string,
    nome: string,
    descricao: string,
    valor: string,
    fotoId: string | null
}
export function CadastroItem({ itens, adicionarItem, paraVoltar }: CadastroItemProp) {

    const [fotoId, setfotoId] = useState<string | null>(null);
    const [nome, setnome] = useState('');
    const [descricao, setdescricao] = useState('');
    const [valor, setvalor] = useState('');
   
    async function adicionarFoto() {
        const fotoEscolhida = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8
        });
        if (!fotoEscolhida.canceled) {
            setfotoId(fotoEscolhida.assets[0].uri);
        }

    }

    function CadastroItemTela() {
        if (!nome.trim() || !valor.trim()) {
            Alert.alert(
                'Atenção: Nome ou valor incompletos'
            );
            return;
        };
        const novoItem: Item = {
            id: Date.now().toString(),
            nome: nome.trim(),
            descricao: descricao.trim(),
            valor: valor.trim(),
            fotoId: fotoId
        };

      adicionarItem(novoItem)
      

    

    }
    return (
        <View style={styles.container}>
            <Pressable onPress={paraVoltar}
                style={styles.botaoVoltar}>
                <Text style={styles.textoVoltar}>
                    Voltar para a tela inicial
                </Text>

            </Pressable>
            <Text style={styles.titulo}>
                Cadastrar novo item
            </Text>
            <Text style={styles.label}>
                Nome do item
            </Text>
            <TextInput style={styles.input}
                placeholder='Ex: Pizza de calabresa'
                value={nome}
                onChangeText={setnome} />

            <Text style={styles.label}>
                Descrição do item
            </Text>
            <TextInput style={styles.input}
                placeholder='Ex: molho, calabresa...'
                value={descricao}
                onChangeText={setdescricao} multiline />

            <Text style={styles.label}>
                Valor do item (R$)
            </Text>
            <TextInput style={styles.input}
                placeholder='Ex: 20,90'
                value={valor}
                onChangeText={setvalor}
                keyboardType='decimal-pad' />

            <Pressable style={styles.botao}
                onPress={adicionarFoto}>
                <Text style={styles.textoBotao}>
                    Escolher foto
                </Text>
            </Pressable>
            {fotoId !== null && (<Image
                source={{ uri: fotoId }}
                style={styles.fotoSelecionada} />
            )}
            <Pressable style={styles.botao}
                onPress={CadastroItemTela}>
                <Text style={styles.textoBotao}>
                    + Cadastrar item
                </Text>
            </Pressable>
            
            <Text style={styles.subtitulo}>
                Meus itens ({itens.length})
            </Text>
            <FlatList
                data={itens}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.lista}
                ListEmptyComponent={<Text style={styles.vazio}>
                    Nenhum item cadastrado
                </Text>}

                renderItem={({ item }) => (
                    <View style={styles.card}>
                        {item.fotoId !== null && (
                            <Image
                                source={{ uri: item.fotoId }}
                                style={styles.fotoSelecionada} />
                        )}


                        <Text style={styles.nomePrato}>
                            {item.nome}
                        </Text>

                        {!!item.descricao && (
                            <Text style={styles.descricao}>
                                {item.descricao}
                            </Text>
                        )}

                        <Text style={styles.preco}>
                            R$ {item.valor}
                        </Text>

                    </View>
                )} />

        </View>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F2FC',
        padding: 24,
        paddingTop: 50,
    },

    titulo: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#452477',
        marginBottom: 20,
    },

    label: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#452477',
    },
    botaoVoltar :{
        marginBottom: 15

    },
    textoVoltar : {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#7043b8'
    },

    input: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#D9CDED',
        borderRadius: 12,
        padding: 14,
        marginBottom: 14,
        fontSize: 16,
    },

    textarea: {
        minHeight: 70,
        textAlignVertical: 'top',
    },

    botao: {
        backgroundColor: '#7043B8',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 20,
    },

    textoBotao: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },

    subtitulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#452477',
        marginBottom: 12,
    },

    lista: {
        paddingBottom: 24,
        flexGrow: 1,
    },
    fotoSelecionada: {
        borderRadius: 12,
        alignItems: 'center',
        width: 120,
        height: 120,
        marginBottom: 16
    },

    vazio: {
        color: '#777777',
        textAlign: 'center',
        marginTop: 20,
    },

    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E5DDF0',
    },

    nomePrato: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#452477',
    },

    descricao: {
        color: '#666666',
        marginTop: 6,
    },

    preco: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#7043B8',
        marginTop: 10,
    },
});
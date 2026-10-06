import { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, ScrollView, Pressable } from 'react-native';
import { CadastroRestaurante } from './CadastroRestaurante';
import { Item } from './itensCadastrados';


type Restaurante = {
  nome: string
  descricao: string,
  foto: string | null
}
type HomeScreenProps = {
  quandoCadastrar: () => void;
  itens: Item[];
  restaurante: Restaurante
};

export function HomeScreen({
  quandoCadastrar,
  itens,
  restaurante,
}: HomeScreenProps) {
  const [busca, setBusca] = useState('');

  const itensFiltrados = itens.filter((item) =>
    item.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <ScrollView
      style={styles.tela}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.cabecalho}>
        <View>
          <Text style={styles.titulo}>Meu Cardápio</Text>
          <Text style={styles.subtitulo}>
            Cadastre o que você faz de melhor
          </Text>
        </View>

      </View>
      <View style={styles.perfilRestaurante}>
        {restaurante.foto ? (
          <Image
            source={{ uri: restaurante.foto }}
            style={styles.fotoRestaurante}
          />
        ) : (
          <View style={styles.fotoRestauranteSemImagem}>
          </View>
        )}

        <View style={styles.infoRestaurante}>
          <Text style={styles.nomeRestaurante}>
            {restaurante.nome}
          </Text>

          <Text style={styles.descricaoRestaurante}>
            {restaurante.descricao}
          </Text>
        </View>
      </View>

      <Pressable
        style={styles.botao}
        onPress={quandoCadastrar}
      >
        <Text style={styles.textoBotao}>
          +  Cadastrar item
        </Text>
      </Pressable>

      <TextInput
        style={styles.busca}
        placeholder="⌕  Buscar item..."
        placeholderTextColor="#9587B2"
        value={busca}
        onChangeText={setBusca}
      />

      <Text style={styles.tituloLista}>
        Meus itens ({itens.length})
      </Text>

      {itensFiltrados.length === 0 ? (
        <View style={styles.vazio}>
          <Text style={styles.textoVazio}>
            {itens.length === 0 ? 'Seu cardápio está vazio' : 'Nenhum prato cadastrado'}
          </Text>
          <Text style={styles.dicaVazio}>
            {itens.length === 0 ? 'Cadastre o seu primeiro item' : 'Nome não encontrado'}
          </Text>
        </View>
      ) : (
        itensFiltrados.map((item) => (
          <View key={item.id} style={styles.card}>
            {item.fotoId ? (
              <Image
                source={{ uri: item.fotoId }}
                style={styles.foto}
              />
            ) : (
              <View style={styles.fotoSemImagem}>
                <Text style={styles.emojiVazio}>🍽️</Text>
              </View>
            )}

            <View style={styles.infoPrato}>
              <Text style={styles.nomePrato}>
                {item.nome}
              </Text>

              {!!item.descricao && (
                <Text
                  style={styles.descricao}
                  numberOfLines={2}
                >
                  {item.descricao}
                </Text>
              )}

              <Text style={styles.preco}>
                R$ {item.valor}
              </Text>
            </View>

            <Text style={styles.seta}>›</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#F6F2FC',
  },
  container: {
    padding: 22,
    paddingTop: 55,
    paddingBottom: 35,
  },
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#452477',
  },
  subtitulo: {
    fontSize: 13,
    color: '#796A99',
    marginTop: 5,
  },
  icone: {
    fontSize: 34,
    color: '#7043B8',
  },
  botao: {
    backgroundColor: '#7043B8',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 18,
    elevation: 3,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  busca: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E3D9F5',
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    marginBottom: 25,
    color: '#452477',
  },
  tituloLista: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#452477',
    marginBottom: 14,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 12,
    marginBottom: 13,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EAE3F5',
    elevation: 2,
  },
  foto: {
    width: 88,
    height: 88,
    borderRadius: 13,
  },
  fotoSemImagem: {
    width: 88,
    height: 88,
    borderRadius: 13,
    backgroundColor: '#EAE1FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoPrato: {
    flex: 1,
    marginLeft: 13,
  },
  nomePrato: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#452477',
  },
  descricao: {
    color: '#827694',
    fontSize: 12,
    marginTop: 5,
  },
  preco: {
    color: '#7043B8',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 8,
  },
  seta: {
    color: '#7043B8',
    fontSize: 28,
    marginLeft: 5,
  },
  vazio: {
    alignItems: 'center',
    paddingVertical: 35,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
  },
  emojiVazio: {
    fontSize: 30,
  },
  textoVazio: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#452477',
    marginTop: 12,
  },
  dicaVazio: {
    color: '#827694',
    marginTop: 6,
    fontSize: 13,
  },
  perfilRestaurante: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    marginBottom: 22,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EAE3F5',
  },

  fotoRestaurante: {
    width: 75,
    height: 75,
    borderRadius: 38,
  },

  fotoRestauranteSemImagem: {
    width: 75,
    height: 75,
    borderRadius: 38,
    backgroundColor: '#EAE1FA',
    alignItems: 'center',
    justifyContent: 'center',
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

  infoRestaurante: {
    flex: 1,
    marginLeft: 14,
  },

  nomeRestaurante: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#452477',
  },

  descricaoRestaurante: {
    fontSize: 13,
    color: '#827694',
    marginTop: 5,
  },
});
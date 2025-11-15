import { StyleSheet } from 'react-native';

export const taskStyles = StyleSheet.create({
  item: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 14,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  done: { backgroundColor: '#f0f0f0' },
  text: { fontSize: 18, color: '#222' },
  textDone: { textDecorationLine: 'line-through', color: '#888' },
  time: { fontSize: 13, color: '#666', marginTop: 4 },
});

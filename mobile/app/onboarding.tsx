import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

const { width } = Dimensions.get('window');

const onboardingData = [
  { icon: '🌍', title: 'Learn 4 Languages', desc: 'English, Japanese, Chinese, and Korean with personalized paths' },
  { icon: '🤖', title: 'AI-Powered Tutor', desc: 'Practice conversations with an AI that corrects and guides you' },
  { icon: '🃏', title: 'Smart Flashcards', desc: 'Spaced repetition to remember vocabulary long-term' },
  { icon: '🏆', title: 'Track Progress', desc: 'XP, streaks, and levels to keep you motivated every day' },
];

export default function OnboardingScreen() {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.slide}>
          <Text style={styles.icon}>{onboardingData[currentPage].icon}</Text>
          <Text style={styles.title}>{onboardingData[currentPage].title}</Text>
          <Text style={styles.desc}>{onboardingData[currentPage].desc}</Text>
        </View>

        {/* Dots */}
        <View style={styles.dots}>
          {onboardingData.map((_, i) => (
            <View key={i} style={[styles.dot, i === currentPage && styles.dotActive]} />
          ))}
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttons}>
        {currentPage < onboardingData.length - 1 ? (
          <>
            <TouchableOpacity style={styles.skipButton}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={() => setCurrentPage(p => p + 1)}>
              <Text style={styles.nextText}>Next</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={[styles.nextButton, { flex: 1 }]}>
            <Text style={styles.nextText}>Get Started</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32 },
  slide: { alignItems: 'center' },
  icon: { fontSize: 80, marginBottom: 24 },
  title: { fontSize: 28, fontWeight: '700', color: '#1E293B', textAlign: 'center', marginBottom: 12 },
  desc: { fontSize: 16, color: '#64748B', textAlign: 'center', lineHeight: 24 },
  dots: { flexDirection: 'row', gap: 8, marginTop: 40 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#E2E8F0' },
  dotActive: { backgroundColor: '#6366F1', width: 24 },
  buttons: { flexDirection: 'row', paddingHorizontal: 24, paddingBottom: 24, gap: 12 },
  skipButton: { flex: 1, paddingVertical: 16, alignItems: 'center', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  skipText: { fontSize: 16, color: '#64748B', fontWeight: '500' },
  nextButton: { flex: 1, paddingVertical: 16, alignItems: 'center', borderRadius: 12, backgroundColor: '#6366F1' },
  nextText: { fontSize: 16, color: '#FFF', fontWeight: '600' },
});

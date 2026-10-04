import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  const [selectedMood, setSelectedMood] = useState('None');
  
  // Step 3: Initialize the counter state object for all 4 required moods
  const [moodCounts, setMoodCounts] = useState({
    happy: 0,
    sad: 0,
    tired: 0,
    excited: 0,
  });

  // Updates both the top label and increases the correct count by 1
  const handleMoodPress = (moodName, moodKey) => {
    setSelectedMood(moodName);
    setMoodCounts((prev) => ({
      ...prev,
      [moodKey]: prev[moodKey] + 1,
    }));
  };

  // Step 5: Reset all data back to zero/default (returns a fresh object)
  const handleReset = () => {
    setSelectedMood('None');
    setMoodCounts({ happy: 0, sad: 0, tired: 0, excited: 0 });
  };

  // --- BONUS LOGIC: Calculate which mood currently has the highest score ---
  const getHighestMood = () => {
    const { happy, sad, tired, excited } = moodCounts;
    // If no buttons have been tapped yet, don't highlight anything
    if (happy === 0 && sad === 0 && tired === 0 && excited === 0) return null;
    
    // Find the maximum value among the counts
    const maxVal = Math.max(happy, sad, tired, excited);
    
    // Return the key of the mood that matches the maximum value
    if (happy === maxVal) return 'happy';
    if (sad === maxVal) return 'sad';
    if (tired === maxVal) return 'tired';
    return 'excited';
  };

  const highestMood = getHighestMood();

  return (
    <View style={styles.container}>
      {/* Settings Icon Placeholder Area */}
      <View style={styles.headerRow}>
        <View style={styles.settingsCircle}>
          <Text style={styles.settingsGear}>⚙️</Text>
        </View>
      </View>

      {/* App Branding */}
      <Text style={styles.mainTitle}>Mood Tracker 📊</Text>
      <Text style={styles.subtitle}>How are you feeling right now?</Text>

      {/* Dynamic Status Text */}
      <Text style={styles.statusText}>Selected: {selectedMood}</Text>

      {/* Mood Buttons Grid (All 4 Required Buttons with Synchronized Emojis) */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => handleMoodPress('Happy 😊', 'happy')}
        >
          <Text style={styles.buttonText}>😊 Happy</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => handleMoodPress('Sad 😢', 'sad')}
        >
          <Text style={styles.buttonText}>😢 Sad</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => handleMoodPress('Tired 😴', 'tired')}
        >
          <Text style={styles.buttonText}>😴 Tired</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => handleMoodPress('Excited 😍', 'excited')}
        >
          <Text style={styles.buttonText}>😍 Excited</Text>
        </TouchableOpacity>
      </View>

      {/* Step 4 & BONUS: Display Live Selection Counts with dynamic highlights */}
      <View style={styles.countsContainer}>
        
        {/* Happy Row */}
        <View style={[styles.statRow, highestMood === 'happy' && styles.highestMoodRow]}>
          <Text style={[styles.countText, highestMood === 'happy' && styles.highestMoodText]}>
            😊 Happy logs: {moodCounts.happy} {highestMood === 'happy' && '🔥'}
          </Text>
        </View>

        {/* Sad Row */}
        <View style={[styles.statRow, highestMood === 'sad' && styles.highestMoodRow]}>
          <Text style={[styles.countText, highestMood === 'sad' && styles.highestMoodText]}>
            😢 Sad logs: {moodCounts.sad} {highestMood === 'sad' && '🔥'}
          </Text>
        </View>

        {/* Tired Row */}
        <View style={[styles.statRow, highestMood === 'tired' && styles.highestMoodRow]}>
          <Text style={[styles.countText, highestMood === 'tired' && styles.highestMoodText]}>
            😴 Tired logs: {moodCounts.tired} {highestMood === 'tired' && '🔥'}
          </Text>
        </View>

        {/* Excited Row */}
        <View style={[styles.statRow, highestMood === 'excited' && styles.highestMoodRow]}>
          <Text style={[styles.countText, highestMood === 'excited' && styles.highestMoodText]}>
            😍 Excited logs: {moodCounts.excited} {highestMood === 'excited' && '🔥'}
          </Text>
        </View>

      </View>

      {/* Step 5: Reset Trigger */}
      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetButtonText}>Reset Counts</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  headerRow: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  settingsCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsGear: {
    fontSize: 20,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  statusText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0066cc',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
    marginBottom: 25,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  countsContainer: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 15,
    borderRadius: 14,
    gap: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
    marginBottom: 25,
  },
  statRow: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  countText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#444',
  },
  // --- BONUS STYLES: Makes the leading selection stand out ---
  highestMoodRow: {
    backgroundColor: '#e6f2ff', // Light blue background block highlight
    borderLeftWidth: 4,
    borderLeftColor: '#0066cc', // Prominent left accent line
  },
  highestMoodText: {
    fontSize: 18, // Text size increases as requested in the assignment bonus
    fontWeight: '700', // Bold layout change
    color: '#004499',
  },
  resetButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 14,
    width: '70%',
    borderRadius: 25,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
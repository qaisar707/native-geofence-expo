// MarkerModal.js
import React from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../utils/colors'; // Ensure this file defines PRIMARY, SECONDARY, PURPLE, RED, GRAY

const MIN_RADIUS = 50;
const RADIUS_STEP = 10;

const MarkerModal = ({
    visible,
    mode, // 'add' or 'edit'
    currentName,
    setCurrentName,
    fenceRadius,
    setFenceRadius,
    tempCoordinates,
    onSave,
    onCancel,
    onDelete,
}) => {
    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TouchableOpacity style={styles.modalButtonsRow} onPress={onCancel}>
                        <Text style={styles.modalButtonText}>X</Text>
                    </TouchableOpacity>

                    <Text style={styles.modalTitle}>
                        {mode === 'add' ? 'New Safe Zone' : 'Edit Safe Zone'}
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter safe zone name"
                        value={currentName}
                        onChangeText={setCurrentName}
                    />
                    <View style={styles.coordinateSection}>
                        <Text style={styles.sectionTitle}>Location:</Text>
                        <View style={styles.coordinateRow}>
                            <Text style={styles.coordinateDisplay}>
                                Lat: {tempCoordinates ? tempCoordinates.latitude.toFixed(6) : ''}
                            </Text>
                            <Text style={styles.coordinateDisplay}>
                                Lng: {tempCoordinates ? tempCoordinates.longitude.toFixed(6) : ''}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.radiusControls}>
                        <TouchableOpacity
                            style={styles.radiusButton}
                            onPress={() => setFenceRadius(Math.max(MIN_RADIUS, fenceRadius - RADIUS_STEP))}
                        >
                            <MaterialIcons name="remove" size={24} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.radiusText}>{fenceRadius}m</Text>
                        <TouchableOpacity
                            style={styles.radiusButton}
                            onPress={() => setFenceRadius(fenceRadius + RADIUS_STEP)}
                        >
                            <MaterialIcons name="add" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.modalDeleteButtonContainer}>
                        <TouchableOpacity style={[styles.modalButton, styles.saveButton]} onPress={onSave}>
                            <Text style={styles.modalButtonText}>{mode === 'add' ? 'Add' : 'Save'}</Text>
                        </TouchableOpacity>
                    </View>
                    {mode === 'edit' && (
                        <View style={styles.modalDeleteButtonContainer}>
                            <TouchableOpacity style={[styles.modalButton, styles.deleteButton]} onPress={onDelete}>
                                <Text style={styles.modalButtonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </Modal>
    );
};

export default MarkerModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 25,
        width: '85%',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 12,
        marginBottom: 15,
        fontSize: 16,
    },
    coordinateSection: { marginVertical: 10 },
    sectionTitle: { fontWeight: 'bold', marginBottom: 8, fontSize: 16 },
    coordinateRow: { flexDirection: 'row', justifyContent: 'space-between' },
    coordinateDisplay: { fontSize: 14, color: colors.PURPLE },

    radiusControls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    radiusButton: {
        backgroundColor: colors.PRIMARY,
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 10,
    },
    radiusText: { fontSize: 18, fontWeight: 'bold', color: colors.PRIMARY },

    modalButtonsRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end', 
        alignSelf: 'flex-end',
        padding: 10,
        borderRadius: 10,
        backgroundColor: colors.PRIMARY
    },
    modalButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        minWidth: 90,
        alignItems: 'center',
    },
    saveButton: { backgroundColor: colors.SECONDARY },
    deleteButton: { backgroundColor: colors.RED },
    modalButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },

    modalDeleteButtonContainer:
    {
        marginTop: 10,
    },
});

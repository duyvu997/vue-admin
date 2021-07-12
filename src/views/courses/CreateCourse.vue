<template>
  <div class="form-create-course-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="160px">
      <el-form-item label="Tên khoá học" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Thời lượng khoá học" prop="duration">
        <div class="duration-field">
          <div class="field" style="margin-right: 10px">
            <el-input v-model="form.duration" />
          </div>
          <div class="field">
            <el-select
              v-model="form.durationType"
              placeholder="Lựa chọn đơn vị thời gian"
              style="width: 100%;"
            >
              <el-option label="giây" value="giây" />
              <el-option label="phút" value="phút" />
            </el-select>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="Thời gian học" prop="date">
        <el-date-picker
          v-model="form.date"
          type="date"
          placeholder="Lựa chọn thời gian học"
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item label="Thông điệp ngắn" prop="shortMessage">
        <el-input v-model="form.shortMessage" />
      </el-form-item>
      <el-form-item label="Mô tả" prop="description">
        <el-input v-model="form.description" type="textarea" />
      </el-form-item>
      <el-form-item label="Trạng thái" prop="status">
        <el-switch v-model="form.status" />
      </el-form-item>
      <el-form-item label="Độ tuổi tối thiểu" prop="minimumAge">
        <el-input v-model="form.minimumAge" />
      </el-form-item>
      <el-form-item label="Độ tuổi tối đa" prop="maximumAge">
        <el-input v-model="form.maximumAge" />
      </el-form-item>
      <el-form-item label="Hình ảnh" prop="picture">
        <el-upload
          :file-list="form.picture"
          :limit="1"
          :auto-upload="false"
          action="https://test.io"
          style="display: flex"
        >
          <el-button style="margin-right: 10px;">
            Chọn hình ảnh
          </el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button @click="onCancel">
          Huỷ
        </el-button>
        <el-button type="primary" @click="onSubmit('form')">
          Tạo
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import store from '@/store/index'
import { courseAction, CREATE_COURSE } from '@/store/course/action.type'

export default Vue.extend({
  name: 'CreateCourse',
  data() {
    return {
      form: {
        name: '',
        duration: '',
        durationType: 'giây',
        date: '',
        shortMessage: '',
        description: '',
        status: false,
        minimumAge: '',
        maximumAge: '',
        picture: []
      },
      rules: {
        name: [
          { required: true, message: 'Không được để trống', trigger: 'change' }
        ],
        duration: [
          { required: true, message: 'Không được để trống', trigger: 'change' }
        ],
        date: [
          { required: true, message: 'Không được để trống', trigger: 'change' }
        ],
        description: [
          { max: 5000, message: 'Tối đa 5000 kí tự', trigger: 'change' }
        ],
        minimumAge: [
          { required: true, message: 'Không được để trống', trigger: 'change' }
        ],
        maximumAge: [
          { required: true, message: 'Không được để trống', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    /* istanbul ignore next */
    formRef(
      formName: string
    ): Vue & { validate: (func: (valid: boolean) => boolean) => void } {
      return this.$refs[formName] as Vue & {
        validate: (func: (valid: boolean) => boolean) => void
      }
    },
    /* istanbul ignore next */
    onSubmit(formName: string) {
      this.formRef(formName).validate((valid: boolean) => {
        if (valid) {
          const courseTobeCreated = {
            description: this.form.description,
            duration: this.form.duration,
            endDate: '',
            fileId: null,
            image: '',
            minAge: this.form.minimumAge,
            name: this.form.name,
            shortMessage: this.form.shortMessage,
            startDate: this.form.date,
            status: this.form.status ? 'ACTIVE' : 'DEACTIVE'
          }
          store.dispatch(courseAction(CREATE_COURSE), courseTobeCreated)
          alert('submit!')
          return true
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /* istanbul ignore next */
    onCancel() {
      this.$router.push({
        path: '/courses/index'
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.form-create-course {
  &-container {
    margin: 30px;

    .duration-field {
      display: flex;

      .field {
        flex: 1 0;
      }
    }
  }
}
</style>

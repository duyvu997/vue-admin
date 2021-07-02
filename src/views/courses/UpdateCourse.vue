<template>
  <div class="form-create-course-container">
    <el-row :gutter="20">
      <el-col :span="15">
        <h3>Thông tin cơ bản</h3>
        <el-form ref="form" :model="form" :rules="rules" label-width="160px">
          <el-form-item label="Tên khoá học" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="Thời lượng khoá học" prop="duration">
            <div class="duration-field">
              <div class="field" style="margin-right: 10px; width: 70%;">
                <el-input v-model="form.duration" />
              </div>
              <div class="field">
                <el-select
                  v-model="form.durationType"
                  placeholder="Lựa chọn đơn vị thời gian"
                  style="width: 30%;"
                >
                  <el-option label="giây" value="giây" />
                  <el-option label="phút" value="phút" />
                </el-select>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="Ngày bắt đầu" prop="startDate">
            <el-date-picker
              v-model="form.startDate"
              type="date"
              placeholder="Lựa chọn thời gian học"
              style="width: 49.4%;"
            />
          </el-form-item>
          <el-form-item label="Ngày kết thúc" prop="endDate">
            <el-date-picker
              v-model="form.endDate"
              type="date"
              placeholder="Lựa chọn thời gian học"
              style="width: 49.4%;"
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
            <el-input style="width: 49.4%;" v-model="form.minimumAge" />
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
              Cập nhật
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="9">
        <h3>Danh sách giáo viên</h3>

        <div class="grid-content bg-purple"></div>
        <div class="grid-content bg-purple-light"></div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="15">
        <h3>Danh sách bài học</h3>

        <div class="grid-content bg-purple"></div>
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :span="9">
        <h3>Danh sách học sinh</h3>

        <div class="grid-content bg-purple"></div>
        <div class="grid-content bg-purple-light"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { courseAction, CREATE_COURSE } from '@/store/course/action.type'
import store from '@/store/index'

export default Vue.extend({
  name: 'UpdateCourse',
  data() {
    return {
      form: {
        name: '123',
        duration: '120',
        durationType: 'giây',
        startDate: '2021-06-07',
        endDate: '2022-06-07',
        shortMessage: 'abc',
        description: '',
        status: true,
        minimumAge: '12',
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
    formRef(
      formName: string
    ): Vue & { validate: (func: (valid: boolean) => boolean) => void } {
      return this.$refs[formName] as Vue & {
        validate: (func: (valid: boolean) => boolean) => void
      }
    },

    onSubmit(formName: string) {
      this.formRef(formName).validate((valid: boolean) => {
        if (valid) {
          const courseTobeCreated = {
            description: this.form.description,
            duration: this.form.duration,
            endDate: this.form.endDate,
            fileId: null,
            image: '',
            minAge: this.form.minimumAge,
            name: this.form.name,
            shortMessage: this.form.shortMessage,
            startDate: this.form.startDate,
            status: this.form.status ? 'ENABLE' : 'DISABLE'
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

    onCancel() {
      this.$router.push({
        path: '/course/index'
      })
    },

    pictureUrl() {
      return this.form.picture[0] ? this.form.picture[0] : ''
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

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
